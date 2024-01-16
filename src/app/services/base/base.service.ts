import { HttpClient, HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';
import { SuccessResponse } from './base.service.interface';

export class BaseService {
  constructor(public readonly baseApi: string, public http: HttpClient) {}

  get<T>(path: string, params?: Params) {
    let httpParams: HttpParams = new HttpParams({ fromObject: params });

    return this.http.get<SuccessResponse<T>>(`${this.baseApi}/${path}`, {
      params: httpParams,
    });
  }

  post<T>(path: string, body?: Params) {
    return this.http.post<SuccessResponse<T>>(`${this.baseApi}/${path}`, body);
  }

  delete<T>(path: string, body?: Params) {
    return this.http.delete<SuccessResponse<T>>(`${this.baseApi}/${path}`, {
      body,
    });
  }
}
