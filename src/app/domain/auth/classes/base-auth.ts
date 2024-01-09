import { inject } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorTypeService } from '../../../services/http-error-type/http-error-type.service';
import { EncryptStorageService } from '../../../services/utils/encrypt-storage.service';
import { HttpSuccessReturn } from '../interfaces/auth.service.interface';

type Form = FormGroup<any>;

export class BaseAuthForm {
  form: Form;
  router: Router;
  fields: string[];

  private readonly alreadyBeenRegisteredError = {
    credentialsAlreadyBeenRegistered: true,
  };

  constructor(
    readonly httpErrorTypeService: HttpErrorTypeService,
    form: Form,
    fields: string[]
  ) {
    this.form = form;
    httpErrorTypeService.errors$$.subscribe(() => {
      this.requestError();
    });
    this.fields = fields;
    this.router = inject(Router);
  }

  requestError() {
    const initialValues: { [key: string]: string } = {};

    this.setError(this.alreadyBeenRegisteredError);

    this.fields.forEach((key) => {
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
    { data }: HttpSuccessReturn,
    storageService: EncryptStorageService
  ) {
    const { token, user } = data;
    const userStringify = JSON.stringify(user);

    storageService.setItem('token', token);
    storageService.setItem('user', userStringify);

    this.router.navigate(['/']);
  }

  private setError(error: { [key: string]: any }) {
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
      this.form.setErrors(errors);
    } else this.setError(this.alreadyBeenRegisteredError);
  }
}