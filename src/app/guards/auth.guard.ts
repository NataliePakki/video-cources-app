import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import * as fromRoot from '../auth/reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authStore: Store<fromRoot.State>, private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.authStore.pipe(select(fromRoot.getLoggedIn)).pipe(catchError(() => this.router.navigate(['/auth/login']))).pipe(map(e => {
      if (e) {
          return true;
      } else {
        this.router.navigate(['/auth/login']);
      }
    }));
  }
}
