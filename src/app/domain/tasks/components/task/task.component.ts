import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { filter, fromEvent } from 'rxjs';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'ta-task',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  providers: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  @Input({ required: true }) task: Task;
  @Output() editTaskName = new EventEmitter<string>();
  newNameControl = new FormControl<string>('', [
    Validators.required,
  ]) as FormControl<string>;
  editing = false;

  constructor(private component: ElementRef) {}

  private get element() {
    return this.component.nativeElement;
  }

  get newNameIsValid() {
    const { name } = this.task;
    const { value } = this.newNameControl;
    const nameChanged = value !== name;
    const isValid = this.newNameControl.valid && nameChanged;

    return isValid;
  }

  ngOnInit(): void {
    fromEvent(this.element, 'dblclick').subscribe(() => {
      if (!this.editing) {
        this.openInEditingMode();
      }
    });

    const clickOutside$ = fromEvent(document, 'click').pipe(
      filter(({ target }: any) => !this.element.contains(target))
    );

    clickOutside$.subscribe(() => {
      if (this.editing) {
        this.closeEditingMode();
      }
    });
  }

  openInEditingMode() {
    this.editing = true;
    this.newNameControl.setValue(this.task.name);
  }

  closeEditingMode() {
    this.editing = false;
  }

  editName() {
    if (!this.newNameIsValid) return;
    const newName = this.newNameControl.value;

    this.task.name = newName;

    this.editTaskName.emit(newName);
    this.closeEditingMode();
  }
}
