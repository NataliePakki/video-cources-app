import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading = new Subject<boolean>();
  constructor() { }

  stop() {
    this._loading.next(false);
  }

  start() {
    this._loading.next(true);
  }

  loading(): Observable<boolean> {
    return this._loading.asObservable();
  }
}
