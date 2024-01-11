import { NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { filter, fromEvent } from 'rxjs';
import { Task } from '../../interfaces/task';
import { TasksService } from '../../services/tasks/tasks.service';

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
  @Output() deleteTask = new EventEmitter();
  newNameControl = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(3),
  ]) as FormControl<string>;
  editing = false;

  constructor(
    private component: ElementRef,
    private tasksService: TasksService
  ) {}

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
        this.changeToEditingMode();
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

  changeToEditingMode(event?: Event) {
    if (event) event.stopPropagation();
    this.editing = true;
    this.newNameControl.setValue(this.task.name);
  }

  closeEditingMode() {
    this.editing = false;
  }

  editName() {
    if (!this.newNameIsValid) return;
    const newName = this.newNameControl.value;

    this.tasksService.editTaskName(newName, this.task._id).subscribe({
      next: () => {
        this.task.name = newName;
        this.closeEditingMode();
      },
    });
  }
}
