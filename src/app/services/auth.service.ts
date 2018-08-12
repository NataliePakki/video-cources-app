import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { UserInteface } from '../auth/models/user.model';
const BASE_URL = 'http://localhost:3004/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private loginSubscription: Subscription;
  private headers = new HttpHeaders({
    'content-type': 'application/json',
  });
  constructor(private http: HttpClient) {
  }

  login(userLogin: string, password: string): Observable<any> {
    const s = this.http.post<any>(`${BASE_URL}/login`, {login: userLogin, password: password}, {headers: this.headers});
    this.loginSubscription = s.subscribe(function(data) {
      localStorage.setItem('user-login', userLogin);
      localStorage.setItem('token', data.token);
    });
    return s;
  }

  logout(): void {
      localStorage.removeItem('user-login');
      localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('user-login') && localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  getUserInfo(): Observable<UserInteface> {
    this.headers.set('Authorization', this.getToken());
    return this.http.post<UserInteface>(`${BASE_URL}/userinfo`, null, { headers: this.headers });
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}
