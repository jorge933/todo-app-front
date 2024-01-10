import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly baseApi = environment.BASE_API;

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get(`${this.baseApi}/tasks`);
  }
}
