import { inject, signal } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorTypeService } from '../../../services/http-error-type/http-error-type.service';
import { EncryptStorageService } from '../../../services/encrypt-storage/encrypt-storage.service';
import { debounceTime } from 'rxjs';
import { errors } from '../../../constants/error-messages';
import { SuccessResponse } from '../../../services/base/base.service.interface';
import { UserResponse } from '../interfaces/auth.service.interface';

type Form = FormGroup<any>;

export class BaseAuthForm {
  form: Form;
  router: Router;
  fields: string[];
  authFailed = false;
  formErrors = signal<string[]>([]);

  private readonly alreadyBeenRegisteredError: ValidationErrors = {
    credentialsAlreadyBeenRegistered: true,
  };

  constructor(
    readonly httpErrorTypeService: HttpErrorTypeService,
    form: Form,
    fields: string[]
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
    const initialValues: { [key: string]: string } = {};

    this.authFailed = true;

    this.setError(this.alreadyBeenRegisteredError);

    this.fields.forEach((key: string) => {
      const value = this.form.controls[key as keyof Form]?.value;

      if (typeof value !== 'string') return;

      initialValues[key as string] = value;
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
    [key: string]: string;
  }) {
    let currentValues: { [key: string]: string } = {};

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
