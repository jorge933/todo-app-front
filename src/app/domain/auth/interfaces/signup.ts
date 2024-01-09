import { FormControl, FormGroup } from '@angular/forms';

export interface SignUp {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface SignUpForm extends SignUp {
  confirmPassword: FormControl<string>;
}

export interface Options {
  label: string;
  placeholder: string;
}

export type FieldOptions = {
  [key in keyof SignUpForm]: Options;
};

export type Forms = FormGroup<SignUpForm>;
