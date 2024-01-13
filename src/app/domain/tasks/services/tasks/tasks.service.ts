import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly baseApi = environment.BASE_API;

  constructor(private http: HttpClient) {}

  getTasks(params?: HttpParams) {
    return this.http.get(`${this.baseApi}/tasks`, {
      params,
    });
  }

  editTaskName(newName: string, id: number) {
    return this.http.post(`${this.baseApi}/tasks/edit`, { newName, id });
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.baseApi}/tasks`, { body: { id } });
  }

  create(name: string) {
    return this.http.post(`${this.baseApi}/tasks/create`, { name });
  }
}
