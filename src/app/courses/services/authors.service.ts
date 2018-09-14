import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { Author } from '../models/author.model';

const BASE_URL = 'http://localhost:3004/authors';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private headers = new HttpHeaders({
    'content-type': 'application/json',
  });
  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers.set('Authorization', this.authService.getToken());
  }

  getAll(): Observable<Author[]> {
      return this.http.get<Author[]>(`${BASE_URL}`);
  }

  get(id: number): Observable<Author> {
    return this.http.get<Author>(`${BASE_URL}/${id}`);
  }

  public getWithParams(textFragment: string): Observable<Author[]> {
    return this.http.get<Author[]>(`${BASE_URL}`, {params: {textFragment}});
  }
}
