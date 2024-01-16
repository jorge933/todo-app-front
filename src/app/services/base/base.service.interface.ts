import {
  HttpErrorResponse,
  HttpHeaderResponse,
  HttpStatusCode,
} from '@angular/common/http';

export interface Params {
  [param: string]:
    | string
    | number
    | boolean
    | readonly (string | number | boolean)[];
}

export interface SuccessResponse<T> {
  data: T;
  message: string;
  statusCode: HttpStatusCode;
  success: boolean;
}

export interface ErrorResponse extends Omit<HttpErrorResponse, 'type'> {
  type?: string;
}
