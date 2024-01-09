import { FormControl, FormGroup } from '@angular/forms';

interface SignUp {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface SignUpForm extends SignUp {
  confirmPassword: FormControl<string>;
}

export interface LoginForm {
  login: FormControl<string>;
  password: FormControl<string>;
}

export interface Options {
  label: string;
  placeholder: string;
}

export type FieldOptions<T> = {
  [key in keyof T]: Options;
};

export type Forms = FormGroup<SignUpForm>;
