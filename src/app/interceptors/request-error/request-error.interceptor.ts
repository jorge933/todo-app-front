import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { inject } from '@angular/core';
import { HttpErrorTypeService } from '../../services/http-error-type/http-error-type.service';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const httpErrorTypeService = inject(HttpErrorTypeService);
  return next(req).pipe(
    catchError((error) => {
      httpErrorTypeService.errors.set(error.error);
      httpErrorTypeService.errors$$.next(error);
      throw error;
    })
  );
};
