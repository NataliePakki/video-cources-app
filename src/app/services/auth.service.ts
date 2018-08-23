import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, of } from 'rxjs';
import { UserInteface } from '../auth/models/user.model';
import { switchMap } from 'rxjs/operators';
import { Authenticate } from '../auth/models/user';

const BASE_URL = 'http://localhost:3004/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private loginSubscription: Subscription;
  constructor(private http: HttpClient) {
  }
  login(auth: Authenticate): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/login`, {login: auth.login, password: auth.password}, {
      headers: {
      'content-type': 'application/json',
      }
    }).pipe(switchMap((data) => {
      localStorage.setItem('token', data.token);
      return of(data);
    }));
  }

  logout(): void {
      localStorage.removeItem('token');
  }

  auth(): Observable<boolean> {
    const token = this.getToken();
    if (token) {
      return this.http.get<boolean>(`${BASE_URL}`, {
        headers: {
          'content-type': 'application/json',
          'Authorization': token
        }
      });
    } else {
      return of(false);
    }
  }

  getUserInfo(): Observable<UserInteface> {
    return this.http.post<UserInteface>(`${BASE_URL}/userinfo`, null, {
      headers: {
        'content-type': 'application/json',
        'Authorization': this.getToken()
      }
    });
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}
