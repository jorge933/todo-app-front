import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpSuccessReturn, SignUp } from './auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseApi = environment.BASE_API;

  constructor(private http: HttpClient) {}

  signup(credentials: SignUp) {
    const request$ = this.http.post<HttpSuccessReturn>(
      `${this.baseApi}/auth/signup`,
      credentials
    );

    return request$;
  }
}
