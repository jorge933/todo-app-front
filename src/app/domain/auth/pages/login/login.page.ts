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
import { ShowInputErrorsDirective } from '../../../../directives/show-input-errors/show-input-errors.directive';
import { HttpErrorTypeService } from '../../../../services/http-error-type/http-error-type.service';
import { EncryptStorageService } from '../../../../services/encrypt-storage/encrypt-storage.service';
import { BaseAuthForm } from '../../classes/base-auth';
import { UserLogin } from '../../interfaces/auth.service.interface';
import { AuthService } from '../../services/auth/auth.service';
import { InputErrorsComponent } from '../../../../components/input-errors/input-errors.component';
import { ControlErrorContainerDirective } from '../../../../directives/control-errors-container/control-errors-container.directive';

@Component({
  selector: 'ta-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    InputErrorsComponent,
    ControlErrorContainerDirective,
    ShowInputErrorsDirective,
  ],
  providers: [AuthService],
  templateUrl: './login.page.html',
  styleUrl: '../../pages.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoginPage extends BaseAuthForm {
  constructor(
    private readonly authService: AuthService,
    private readonly storageService: EncryptStorageService,
    override readonly httpErrorTypeService: HttpErrorTypeService
  ) {
    super(
      httpErrorTypeService,
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
      ['login', 'password']
    );
  }

  login() {
    if (!!this.buttonDisabled) return;

    const { login, password } = this.form.controls;

    const credentials: UserLogin = {
      login: login.value,
      password: password.value,
    };

    const request$ = this.authService.login(credentials);

    request$.subscribe({
      next: (response) => {
        this.requestSuccess(response, this.storageService);
      },
    });
  }
}
