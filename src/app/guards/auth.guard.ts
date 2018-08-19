import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.auth().pipe(catchError(() => this.router.navigate(['/auth/login']))).pipe(map(e => {
      if (e) {
          return true;
      } else {
        this.router.navigate(['/auth/login']);
      }
    }));
  }
}
