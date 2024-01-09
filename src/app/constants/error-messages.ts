import { InjectionToken } from '@angular/core';
import {
  Error,
  FormErrors,
} from '../domain/auth/interfaces/error-messages.interface';

export const errors: Error = {
  minlength: ({ actualLength, requiredLength }: any) =>
    `Min. Length: ${actualLength}/${requiredLength}`,
  maxlength: ({ actualLength, requiredLength }: any) =>
    `Max. Length: ${actualLength}/${requiredLength}`,
  required: () => 'Campo obrigatório',
  invalidConfirmPassword: () => 'As senhas precisam ser iguais',
  email: () => 'Email inválido',
};

export const FORM_ERRORS: FormErrors = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => errors,
});
