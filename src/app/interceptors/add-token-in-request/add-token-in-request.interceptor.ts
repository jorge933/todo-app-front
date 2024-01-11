import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { USER_INFOS } from '../../constants/user-infos';

export const addTokenInRequestInterceptor: HttpInterceptorFn = (
  request,
  next
) => {
  const includesAuthInRoute = request.url.includes('auth');
  if (includesAuthInRoute) return next(request);

  const { token } = inject(USER_INFOS);

  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token,
  });

  const newRequest = request.clone({
    headers,
  });

  return next(newRequest);
};
