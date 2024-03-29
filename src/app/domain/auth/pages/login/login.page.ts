import { Component, ViewEncapsulation } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { InputErrorsComponent } from '../../../../components/input-errors/input-errors.component';
import { ControlErrorContainerDirective } from '../../../../directives/control-errors-container/control-errors-container.directive';
import { ShowInputErrorsDirective } from '../../../../directives/show-input-errors/show-input-errors.directive';
import { HttpErrorTypeService } from '../../../../services/http-error-type/http-error-type.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { BaseAuthForm } from '../../classes/base-auth';
import { LoginForm } from '../../interfaces/auth-forms';
import {
  UserLogin,
  UserResponse,
} from '../../interfaces/auth.service.interface';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'ta-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    InputErrorsComponent,
    ShowInputErrorsDirective,
    ControlErrorContainerDirective,
    ShowInputErrorsDirective,
  ],
  providers: [AuthService],
  templateUrl: './login.page.html',
  styleUrl: '../../pages.scss',
  encapsulation: ViewEncapsulation.None,
})
export default class LoginPage extends BaseAuthForm<LoginForm> {
  constructor(
    private readonly authService: AuthService,
    private readonly storageService: StorageService,
    readonly httpErrorTypeService: HttpErrorTypeService,
    hotToastService: HotToastService
  ) {
    super(
      new FormGroup({
        login: new FormControl<string>('', [
          Validators.required,
          Validators.minLength(3),
        ]) as FormControl<string>,

        password: new FormControl<string>('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ]) as FormControl<string>,
      }),
      ['login', 'password'],
      hotToastService
    );
  }

  login() {
    if (!!this.formIsValid) return;

    const { login, password } = this.form.controls;

    const credentials: UserLogin = {
      login: login.value,
      password: password.value,
    };

    const request$ = this.authService.post<UserResponse>(
      'auth/login',
      credentials
    );

    request$.subscribe({
      next: (response) => this.requestSuccess(response, this.storageService),
      error: () => this.requestError(),
    });
  }
}
