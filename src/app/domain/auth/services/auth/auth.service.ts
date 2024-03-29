import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { BaseService } from '../../../../services/base/base.service';
import { UserLogin } from '../../interfaces/auth.service.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(http: HttpClient) {
    super(environment.BASE_API, http);
  }

  login(credentials: UserLogin) {
    const request$ = this.post('auth/login', credentials);

    return request$;
  }
}
