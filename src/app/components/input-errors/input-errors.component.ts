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

  constructor(private changeDetectionRef: ChangeDetectorRef) {}

  setMessage(message: string | null) {
    if (message !== this._message) {
      this._message = message || '';
      this._hide = !message;
      this.changeDetectionRef.detectChanges();
    }
  }
}
