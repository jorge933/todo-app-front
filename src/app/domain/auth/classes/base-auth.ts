import { inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorTypeService } from '../../../services/http-error-type/http-error-type.service';
import { EncryptStorageService } from '../../../services/encrypt-storage/encrypt-storage.service';
import { debounceTime } from 'rxjs';
import { errors } from '../../../constants/error-messages';
import { SuccessResponse } from '../../../services/base/base.service.interface';
import { UserResponse } from '../interfaces/auth.service.interface';

type Form<T extends { [K in keyof T]: FormControl<string | number | null> }> =
  FormGroup<T>;

export class BaseAuthForm<
  T extends { [K in keyof T]: FormControl<string | number | null> }
> {
  form: Form<T>;
  router: Router;
  fields: Array<keyof T>;
  authFailed = false;
  formErrors = signal<string[]>([]);

  private readonly alreadyBeenRegisteredError: ValidationErrors = {
    credentialsAlreadyBeenRegistered: true,
  };

  constructor(
    readonly httpErrorTypeService: HttpErrorTypeService,
    form: Form<T>,
    fields: Array<keyof T>
  ) {
    this.form = form;
    this.fields = fields;
    this.router = inject(Router);

    httpErrorTypeService.errors$$.subscribe(() => {
      this.requestError();
    });

    form.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      const values = Object.keys(form.errors ?? {});

      const messages = values.reduce(
        (previousValue: string[], currentValue: string) => {
          const message = errors[currentValue]();
          return [...previousValue, message];
        },
        []
      );

      this.formErrors.update(() => {
        return messages;
      });
    });
  }

  get formIsValid() {
    const errors = this.form.errors;

    if (!errors) {
      return !this.form.valid;
    }

    const errorsLength = Object.keys(errors).length;
    return !!errorsLength;
  }

  requestError() {
    const initialValues: { [Key in keyof T]?: string } = {};

    this.authFailed = true;

    this.setError(this.alreadyBeenRegisteredError);

    this.fields.forEach((key) => {
      const value = this.form.controls[key]?.value;

      if (typeof value !== 'string') return;

      initialValues[key] = value;
    });

    const valueChangesSubscription = this.form.valueChanges.subscribe(() => {
      this.manageWhenCanResubmitTheForm(initialValues);
    });

    this.form.statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        valueChangesSubscription.unsubscribe();
      }
    });
  }

  requestSuccess(
    { data }: SuccessResponse<UserResponse>,
    storageService: EncryptStorageService
  ) {
    const { token, user } = data;
    const userStringify = JSON.stringify(user);

    storageService.setItem('token', token);
    storageService.setItem('user', userStringify);

    this.router.navigate(['/']);
  }

  private setError(error: { [key: string]: ValidationErrors }) {
    const { errors: formErrors } = this.form;
    const errors = {
      ...formErrors,
      ...error,
    };

    this.form.setErrors(errors);
  }

  private manageWhenCanResubmitTheForm(initialValues: {
    [Key in keyof T]?: string;
  }) {
    let currentValues: { [Key in keyof T]?: string } = {};

    this.fields.forEach((field) => {
      currentValues[field] = this.form.controls[field].value;
    });

    const valuesAreDifferent = this.fields.some((field) => {
      const initialValue = initialValues[field];
      const { value: currentValue } = this.form.controls[field];

      return initialValue !== currentValue;
    });

    if (valuesAreDifferent) {
      const errors = this.form.errors ?? ({} as ValidationErrors);
      delete errors['credentialsAlreadyBeenRegistered'];
      this.authFailed = false;
      this.form.setErrors(errors);
    } else this.setError(this.alreadyBeenRegisteredError);
  }
}
