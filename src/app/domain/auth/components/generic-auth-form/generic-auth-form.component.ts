import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FieldOptions } from '../../interfaces/signup';

@Component({
  selector: 'ta-generic-auth-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './generic-auth-form.component.html',
  styleUrl: './generic-auth-form.component.scss',
})
export class GenericAuthFormComponent {
  @Input({ required: true }) form: FormGroup;
  @Input({ required: true }) title: string;
  @Input({ required: true }) fieldOptions: FieldOptions;
  inputNames: Array<keyof FieldOptions>;

  @Output() formSubmit = new EventEmitter();

  ngOnInit(): void {
    this.inputNames = Object.keys(this.form.controls) as Array<
      keyof FieldOptions
    >;
  }
}
