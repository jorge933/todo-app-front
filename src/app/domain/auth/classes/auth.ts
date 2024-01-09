import { FormGroup, ValidationErrors } from '@angular/forms';
import { SignUpForm } from '../interfaces/signup';
import { HttpSuccessReturn } from '../../../services/auth/auth.interface';
import { EncryptStorageService } from '../../../services/utils/encrypt-storage.service';

export class Auth {
  errors: { message: string }[];

  constructor() {}

  requestError(error: any, form: FormGroup<SignUpForm>) {
    this.errors = error;
    const formErrors = form.errors;
    const errors = {
      ...formErrors,
      credentialsAlreadyBeenRegistered: true,
    };
    form.setErrors(errors);

    const { value: initialUsername } = form.controls.username;
    const { value: initialEmail } = form.controls.email;

    const sla = form.valueChanges.subscribe(() => {
      const { value: username } = form.controls.username;
      const { value: email } = form.controls.email;

      const usernamesAreDifferent = initialUsername !== username;
      const emailsAreDifferent = initialEmail !== email;

      if (usernamesAreDifferent || emailsAreDifferent) {
        const errors = form.errors as ValidationErrors;
        delete errors['credentialsAlreadyBeenRegistered'];
        form.setErrors(errors);
      }
    });

    form.statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        sla.unsubscribe();
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

    document.location.pathname = '/';
  }
}
