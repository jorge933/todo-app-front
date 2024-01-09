import { AbstractControl } from '@angular/forms';
import { default as validator } from 'validator';

export function confirmPassword(formGroup: any) {
  const { password, confirmPassword } = formGroup.controls;
  const equalPasswords = password.value === confirmPassword.value;

  return equalPasswords ? null : { invalidConfirmPassword: true };
}

export function isEmailValidator(control: AbstractControl) {
  const { value } = control;
  const isEmail = validator.isEmail(value);

  return isEmail ? null : { email: true };
}
