import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
  HttpSuccessReturn,
  SignUp,
} from '../../../../services/auth/auth.interface';
import { AuthService } from '../../../../services/auth/auth.service';
import { EncryptStorageService } from '../../../../services/utils/encrypt-storage.service';
import { GenericAuthFormComponent } from '../../components/generic-auth-form/generic-auth-form.component';
import { FieldOptions, SignUpForm } from '../../interfaces/signup';
import {
  confirmPassword,
  isEmailValidator,
} from '../../validators/auth.validator';
import { Auth } from '../../classes/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, GenericAuthFormComponent, MatInputModule],
  providers: [AuthService],
  templateUrl: './signup.page.html',
  styleUrl: './signup.page.scss',
})
export class SignupPage extends Auth {
  form: FormGroup<SignUpForm> = new FormGroup(
    {
      username: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]) as FormControl<string>,

      email: new FormControl<string>('', [
        Validators.required,
        isEmailValidator,
      ]) as FormControl<string>,

      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]) as FormControl<string>,
      confirmPassword: new FormControl<string>('', [
        Validators.required,
      ]) as FormControl<string>,
    },
    [confirmPassword]
  );

  fieldOptions: FieldOptions = {
    username: {
      label: 'Usuário',
      placeholder: 'Ex. johndoe',
    },
    email: {
      label: 'Email',
      placeholder: 'Ex. johndoe@gmail.com',
    },
    password: {
      label: 'Senha',
      placeholder: '',
    },
    confirmPassword: {
      label: 'Confirme Sua Senha',
      placeholder: '',
    },
  };

  constructor(
    private readonly authService: AuthService,
    private readonly storageService: EncryptStorageService
  ) {
    super();
  }

  createUser() {
    if (!this.form.valid) return;

    const { username, email, password } = this.form.controls;
    const credentials: SignUp = {
      username: username.value,
      email: email.value,
      password: password.value,
    };

    const request$ = this.authService.signup(credentials);

    request$.subscribe({
      next: (response) => this.requestSuccess(response, this.storageService),
      error: ({ error }) => {
        this.requestError(error, this.form);
      },
    });
  }
}
//aigpam´jm
