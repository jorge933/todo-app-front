import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { EncryptStorageService } from '../../services/encrypt-storage/encrypt-storage.service';

export const addTokenInRequestInterceptor: HttpInterceptorFn = (
  request,
  next
) => {
  const includesAuthInRoute = request.url.includes('auth');
  if (includesAuthInRoute) return next(request);

  const encryptStorageService = inject(EncryptStorageService);
  const token = encryptStorageService.getItem('token');

  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token,
  });

  const newRequest = request.clone({
    headers,
  });

  return next(newRequest);
};
