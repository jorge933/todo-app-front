import { InjectionToken } from '@angular/core';

export interface Error {
  [key: string]: (...args: any) => string;
}

export type FormErrors = InjectionToken<Error>;
