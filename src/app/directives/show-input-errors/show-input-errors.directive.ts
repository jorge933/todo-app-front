import {
  ComponentRef,
  Directive,
  Inject,
  Optional,
  Self,
  ViewContainerRef,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { InputErrorsComponent } from '../../components/input-errors/input-errors.component';
import { FORM_ERRORS } from '../../constants/error-messages';
import { Error as FormErrors } from '../../domain/auth/interfaces/error-messages.interface';
import { ControlErrorContainerDirective } from '../control-errors-container/control-errors-container.directive';

@Directive({
  selector: 'input[matInput]',
  standalone: true,
})
export class ShowInputErrorsDirective {
  ref: ComponentRef<InputErrorsComponent>;
  container: ViewContainerRef;

  constructor(
    @Self() private control: NgControl,
    @Inject(FORM_ERRORS) private errors: FormErrors,
    controlErrorContainer: ControlErrorContainerDirective
  ) {
    this.container = controlErrorContainer?.viewContainerRef ?? null;
  }

  ngOnInit(): void {
    this.control.valueChanges?.subscribe(() => {
      const { errors } = this.control;

      if (errors) {
        const firstErrorName = Object.keys(errors)[0];
        const getErrorMessage = this.errors[firstErrorName];
        const message = getErrorMessage(errors[firstErrorName]);

        this.setError(message);
      } else if (this.ref) {
        this.setError(null);
      }
    });
  }

  setError(text: string | null) {
    if (!this.ref) {
      this.ref = this.container.createComponent(InputErrorsComponent);
    }

    this.ref.instance.setMessage(text);
  }
}