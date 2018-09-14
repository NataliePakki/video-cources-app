import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Course } from '../models/course';
import { AuthService } from '../../services/auth.service';

const BASE_URL = 'http://localhost:3004/courses';

@Injectable({
  providedIn: 'root'
})
export class CourseDataService {
  private headers = new HttpHeaders({
    'content-type': 'application/json',
  });
  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers.set('Authorization', this.authService.getToken());
  }

  getAll(): Observable<Course[]> {
      return this.http.get<Course[]>(`${BASE_URL}`);
  }

  get(id: number): Observable<Course> {
    return this.http.get<Course>(`${BASE_URL}/${id}`);
  }

  public getWithParams(textFragment: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${BASE_URL}`, {params: {textFragment}});
  }

  add(course: Course): Observable<Course> {
    return this.http.post<Course>(`${BASE_URL}`, course, {headers: this.headers});
  }

  update(course: Course): Observable<Course> {
    return this.http.put<Course>(`${BASE_URL}/${course.id}`, course, {headers: this.headers});
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/${id}`);
  }
}
