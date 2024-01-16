import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { getUserInfos } from '../../functions/user-infos';

export const addTokenInRequestInterceptor: HttpInterceptorFn = (
  request,
  next
) => {
  const includesAuthInRoute = request.url.includes('auth');
  if (includesAuthInRoute) return next(request);

  const { token } = getUserInfos();

  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token,
  });

  const newRequest = request.clone({
    headers,
  });

  return next(newRequest);
};
