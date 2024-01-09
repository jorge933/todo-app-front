import { Injectable, WritableSignal, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorTypeService {
  errors$$ = new Subject<string>();
  errors: WritableSignal<
    {
      message: string;
    }[]
  > = signal([]);
}
