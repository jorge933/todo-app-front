import { Directive, HostBinding, Input } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { ERROR_MESSAGES } from '../../constants/error-messages';

@Directive({
  selector: '[taShowInputErrors]',
  standalone: true,
})
export class ShowInputErrorsDirective {
  @Input('taShowInputErrorsElementControl') elementControl:
    | AbstractControl
    | FormGroup;
  @HostBinding('innerHTML') innerHTML: string;
  errorsInTemplate: Record<string, true> = {};

  constructor() {}

  ngAfterContentInit(): void {
    this.elementControl.statusChanges.subscribe(() =>
      this.validate.apply(this)
    );
  }

  validate() {
    const { errors } = this.elementControl;
    if (!errors) return;

    const errorNames = Object.keys(errors as Object);

    errorNames.forEach((error) => {
      const showingInTemplate = !!this.errorsInTemplate[error];
      const errorMessage = ERROR_MESSAGES[error];

      if (!showingInTemplate || errorMessage?.updateConstantly) {
        this.setErrorMessage(error);
      }
    });
  }

  setErrorMessage(errorName: string) {
    const error = ERROR_MESSAGES[errorName];
    const { propertiesToTransform } = error;
    let { message } = error;

    if (!!propertiesToTransform) {
      const errors = this.elementControl.errors as ValidationErrors;
      const props = Object.keys(propertiesToTransform as Object);

      props.forEach((prop) => {
        const propertyToTransform = propertiesToTransform[prop];
        const valueToReplace =
          errors[errorName][propertyToTransform] ?? propertyToTransform;

        const messageTransformed = this.transformMessage(
          prop,
          valueToReplace,
          message
        );

        message = messageTransformed;
      });
    }

    this.setInnerHTML(message);
  }

  transformMessage(key: string, value: string, message: string) {
    const regex = new RegExp(`{*${key}*}`, 'g');
    return message.replace(regex, value);
  }

  setInnerHTML(html: string) {
    this.innerHTML = html;
  }
}
