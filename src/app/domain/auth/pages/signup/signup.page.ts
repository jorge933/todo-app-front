import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { ControlErrorContainerDirective } from '../../../../directives/control-errors-container/control-errors-container.directive';
import { ShowInputErrorsDirective } from '../../../../directives/show-input-errors/show-input-errors.directive';
import { EncryptStorageService } from '../../../../services/encrypt-storage/encrypt-storage.service';
import { HttpErrorTypeService } from '../../../../services/http-error-type/http-error-type.service';
import { BaseAuthForm } from '../../classes/base-auth';
import { SignUpForm } from '../../interfaces/auth-forms';
import {
  RegisterUser,
  UserResponse,
} from '../../interfaces/auth.service.interface';
import { AuthService } from '../../services/auth/auth.service';
import {
  confirmPassword,
  isEmailValidator,
} from '../../validators/auth.validator';

@Component({
  selector: 'ta-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    ShowInputErrorsDirective,
    ControlErrorContainerDirective,
    ShowInputErrorsDirective,
  ],
  providers: [AuthService],
  templateUrl: './signup.page.html',
  styleUrl: '../../pages.scss',
  encapsulation: ViewEncapsulation.None,
})
export default class SignupPage extends BaseAuthForm {
  constructor(
    private readonly authService: AuthService,
    private readonly storageService: EncryptStorageService,
    override readonly httpErrorTypeService: HttpErrorTypeService
  ) {
    super(
      httpErrorTypeService,
      new FormGroup(
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
        [confirmPassword as ValidatorFn]
      ),
      ['username', 'email']
    );
  }

  createUser() {
    if (!!this.formIsValid) return;

    const { username, email, password } = this.form.controls;
    const credentials: RegisterUser = {
      username: username.value,
      email: email.value,
      password: password.value,
    };

    const request$ = this.authService.post<UserResponse>(
      'auth/signup',
      credentials
    );

    request$.subscribe({
      next: (response) => {
        this.requestSuccess(response, this.storageService);
      },

      error: () => this.requestError(),
    });
  }
}
