import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { BaseService } from '../../../../services/base/base.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService extends BaseService {
  constructor(http: HttpClient) {
    super(environment.BASE_API, http);
  }
}
