import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
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
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    ShowInputErrorsDirective,
    ControlErrorContainerDirective,
    MatExpansionModule,
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

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.tasksService.getTasks().subscribe({
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
}
