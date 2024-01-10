import { ChangeDetectorRef, Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  template: `<mat-error [class.hide]="_hide">{{ _message }}</mat-error>`,
  styleUrl: './input-errors.component.scss',
  selector: 'ta-input-errors',
  imports: [MatFormFieldModule],
  standalone: true,
})
export class InputErrorsComponent {
  _message: string;
  _hide = true;

  setMessage(value: any) {
    if (value !== this._message) {
      this._message = value;
      this._hide = !value;
      this.changeDetectionRef.detectChanges();
    }
  }

  constructor(private changeDetectionRef: ChangeDetectorRef) {}
}
