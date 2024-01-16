import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { default as validator } from 'validator';

interface Controls {
  password: AbstractControl<string>;
  confirmPassword: AbstractControl<string>;
}

export function confirmPassword(
  formGroup: FormGroup<Controls>
): ValidationErrors | null {
  const { password, confirmPassword } = formGroup?.controls;
  const equalPasswords = password?.value === confirmPassword?.value;

  return equalPasswords || !confirmPassword.dirty
    ? null
    : { invalidConfirmPassword: true };
}

export function isEmailValidator(control: AbstractControl) {
  const { value } = control;
  const isEmail = validator.isEmail(value);

  return isEmail ? null : { email: true };
}
