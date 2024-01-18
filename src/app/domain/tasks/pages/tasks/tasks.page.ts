import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ControlErrorContainerDirective } from '../../../../directives/control-errors-container/control-errors-container.directive';
import { ShowInputErrorsDirective } from '../../../../directives/show-input-errors/show-input-errors.directive';
import { Task } from '../../interfaces/task';
import { TasksService } from '../../services/tasks/tasks.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ControlErrorContainerDirective,
    ShowInputErrorsDirective,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './tasks.page.html',
  styleUrl: './tasks.page.scss',
})
export default class TasksPage {
  createTaskControl = new FormControl<string>('', [
    Validators.required,
    Validators.maxLength(15),
  ]) as FormControl<string>;

  tasks = signal<Task[]>([]);

  constructor(
    private tasksService: TasksService,
    private hotToastService: HotToastService
  ) {
  }


  updateTasks(tasks: Task[]) {
    this.tasks.update(() => tasks);
    this.dataSource = new MatTableDataSource(tasks);
  }
  }

  createTask(event: Event) {
    event.preventDefault();

    const { value: name } = this.createTaskControl;

    this.tasksService.post<Task>('tasks/create', { name }).subscribe({
      next: ({ data: newTask }) => {
        const tasks = this.tasks();

        if (tasks.length < 10) {
          tasks.push(newTask);
          this.updateTasks(tasks);
        }
        this.createTaskControl.reset();

        this.hotToastService.success('Tarefa criada com sucesso', {
          style: HOT_TOAST_STYLES.success,
        });
      },
    });
  }
}
