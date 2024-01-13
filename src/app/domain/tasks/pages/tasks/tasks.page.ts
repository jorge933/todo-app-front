import { NgClass, NgIf } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { debounceTime, map, of } from 'rxjs';
import { ControlErrorContainerDirective } from '../../../../directives/control-errors-container/control-errors-container.directive';
import { ShowInputErrorsDirective } from '../../../../directives/show-input-errors/show-input-errors.directive';
import { TaskComponent } from '../../components/task/task.component';
import { Task } from '../../interfaces/task';
import { TasksService } from '../../services/tasks/tasks.service';

@Component({
  selector: 'ta-tasks-page',
  standalone: true,
  imports: [
    TaskComponent,
    ReactiveFormsModule,
    NgClass,
    NgIf,
    ShowInputErrorsDirective,
    ControlErrorContainerDirective,
    MatButtonModule,
    MatInputModule,
    MatExpansionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [TasksService],
  templateUrl: './tasks.page.html',
  styleUrl: './tasks.page.scss',
})
export default class TasksPage {
  tasks = signal<Task[]>([]);
  newTaskNameControl = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(3),
  ]) as FormControl<string>;

  filterTasksForm = new FormGroup({
    name: new FormControl<string>('') as FormControl<string>,
    createdAt: this.returnRangeForm<null, null>(null, null),
    updatedAt: this.returnRangeForm<null, null>(null, null),
  });

  propToSort = new FormControl();
  order = new FormControl<'asc' | 'desc'>('asc');

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  filterFutureDates(date: Date | null) {
    if (!date) return false;

    const today = new Date();

    return date <= today;
  }

  private returnRangeForm<StartType, EndType>(start: StartType, end: EndType) {
    return new FormGroup({
      start: new FormControl<StartType>(start),
      end: new FormControl<EndType>(end),
    });
  }

  getTasks(params?: HttpParams) {
    this.tasksService.getTasks(params).subscribe({
      next: (res: { [key: string]: any }) => this.updateTasks(res['data']),

      error: (err) => {
        throw new Error(err);
      },
    });
  }

  updateTasks(tasks: Task[]) {
    this.tasks.update(() => tasks);
  }

  deleteTask(id: number) {
    this.tasksService.deleteTask(id).subscribe({
      next: () => {
        const tasks = this.tasks().filter((task) => task._id !== id);
        this.updateTasks(tasks);
      },
    });
  }

  createTask() {
    const { valid: isValid, value: name } = this.newTaskNameControl;

    if (!isValid) return;

    this.tasksService.create(name).subscribe({
      next: (res) => {
        const tasks = this.tasks();

        if (tasks.length < 10) {
          tasks.push({
            _id: res as number,
            name,
          });
          this.updateTasks(tasks);
        }

        this.newTaskNameControl.reset();
      },
    });
  }

  filterTasks() {
    const values: { [key: string]: any } = this.filterTasksForm.value;
    const keys = Object.keys(values);

    of(keys)
      .pipe(
        map((keys) => {
          const keysFiltered = this.filterKeys(keys, values);

          const filters = keysFiltered.reduce((previousValue, key) => {
            const filterValue = values[key];
            const { start, end } = filterValue;

            if (!start && !end) {
              const isString = typeof filterValue === 'string';
              const value = isString
                ? `${key},like=${filterValue}`
                : filterValue;

              return previousValue ? (previousValue += `AND${value}`) : value;
            }

            const value = `${key},date=${start},date=${end}`;

            return previousValue
              ? (previousValue += `AND${value}`)
              : previousValue;
          }, '');

          return filters;
        })
      )
      .subscribe((filter) => {
        const { value: sortBy } = this.propToSort;
        const { value: order } = this.order;
        let sort = !!sortBy ? `${sortBy},${order}` : null;

        const params = new HttpParams({
          fromObject: {
            filter,
            sort: sort ?? '',
          },
        });

        this.getTasks(params);
      });
  }

  filterKeys(keys: string[], values: { [key: string]: any }) {
    const keysFiltered = keys.filter((key) => {
      const value = values[key];

      const isObject = typeof value === 'object';
      const isDate = value instanceof Date;

      const hasValue = (!isObject || isDate) && !!value;

      if (hasValue) return true;

      const somePropertyHasValue = !!value.start || !!value.end;

      return somePropertyHasValue;
    });

    return keysFiltered;
  }
}
