import { Component, signal } from '@angular/core';
import { TasksService } from '../../services/tasks/tasks.service';
import { Task } from '../../interfaces/task';
import { TaskComponent } from '../../components/task/task.component';

@Component({
  selector: 'ta-tasks-page',
  standalone: true,
  imports: [TaskComponent],
  providers: [TasksService],
  templateUrl: './tasks.page.html',
  styleUrl: './tasks.page.scss',
})
export class TasksPage {
  tasks = signal<Task[]>([]);
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
}
