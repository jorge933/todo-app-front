import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import {
  HttpSuccessReturn,
  UserLogin,
  RegisterUser,
} from '../../interfaces/auth.service.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseApi = environment.BASE_API;

  constructor(private http: HttpClient) {}

  signup(credentials: RegisterUser) {
    const request$ = this.http.post<HttpSuccessReturn>(
      `${this.baseApi}/auth/signup`,
      credentials
    );

    return request$;
  }

  login(credentials: UserLogin) {
    const request$ = this.http.post<HttpSuccessReturn>(
      `${this.baseApi}/auth/login`,
      credentials
    );

    return request$;
  }
}
