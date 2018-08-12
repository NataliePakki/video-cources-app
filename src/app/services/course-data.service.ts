import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseItemInterface } from '../course-list/models/course-item.model';
import { AuthService } from './auth.service';

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

  getAll(): Observable<CourseItemInterface[]> {
      return this.http.get<CourseItemInterface[]>(`${BASE_URL}`);
  }

  get(id: number): Observable<CourseItemInterface> {
    return this.http.get<CourseItemInterface>(`${BASE_URL}/${id}`);
  }

  public getWithParams(textFragment: string, count: string = ''): Observable<CourseItemInterface[]> {
    return this.http.get<CourseItemInterface[]>(`${BASE_URL}`, {params: {textFragment, count}});
  }

  add(course: CourseItemInterface): Observable<CourseItemInterface> {
    return this.http.post<CourseItemInterface>(`${BASE_URL}`, course, {headers: this.headers});
  }

  update(course: CourseItemInterface): Observable<CourseItemInterface> {
    return this.http.put<CourseItemInterface>(`${BASE_URL}/${course.id}`, course, {headers: this.headers});
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/${id}`);
  }
}
