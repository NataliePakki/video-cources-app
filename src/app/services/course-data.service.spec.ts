import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CourseDataService } from './course-data.service';
import { Course } from '../courses/models/course';

const BASE_URL = 'http://localhost:3004/courses';

describe('CourseDataService', () => {
  let httpMock: HttpTestingController;
  const mockCourses = [
    new Course(1, 'title1', 'author1', 'descr1'),
    new Course(2, 'title2', 'author2', 'descr2'),
    new Course(3, 'title3', 'author3', 'descr3'),
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ CourseDataService ]
    });

    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([CourseDataService], (service: CourseDataService) => {
    expect(service).toBeTruthy();
    service.getAll().subscribe((data) => {
      expect(data).toEqual(mockCourses);
    });
    const req = httpMock.expectOne(BASE_URL);
    req.flush(mockCourses);
    expect(req.request.method).toBe('GET');

    httpMock.verify();
  }));

  describe('get', () => {
    it('should return course when exist', inject([CourseDataService], (service: CourseDataService) => {

      service.get(1).subscribe((data) => {
        expect(data).toEqual(mockCourses[0]);
      });
      const req = httpMock.expectOne(BASE_URL + '/1');
      req.flush(mockCourses[0]);
      expect(req.request.method).toBe('GET');
      httpMock.verify();
    }));
  });

  describe('get with parameters', () => {
    it('should return courses when exist', inject([CourseDataService], (service: CourseDataService) => {
      const textFragment = 'text';
      service.getWithParams(textFragment).subscribe((data) => {
        expect(data).toEqual(mockCourses);
      });
      const req = httpMock.expectOne(BASE_URL + '?textFragment=' + textFragment);
      req.flush(mockCourses);
      expect(req.request.method).toBe('GET');
      httpMock.verify();
    }));
  });

  describe('add', () => {
    it('should be added', inject([CourseDataService], (service: CourseDataService) => {
      const addedCourseId = 4;
      const course = new Course(addedCourseId, 'title', 'author', 'description');

      service.add(course).subscribe((data) => {
        expect(data).toEqual(course);
      });

      const req = httpMock.expectOne(BASE_URL);
      req.flush(course);
      expect(req.request.method).toBe('POST');
      httpMock.verify();

    }));

  });

  describe('update', () => {
    it('should be updated', inject([CourseDataService], (service: CourseDataService) => {
      const updatedCourseId = 3;

      const updatedCourse = new Course(updatedCourseId, 'title', 'author', 'description');

      service.update(updatedCourse).subscribe((data) => {
        expect(data).toEqual(updatedCourse);
      });

      const req = httpMock.expectOne(`${BASE_URL}/${updatedCourseId}`);
      req.flush(updatedCourse);
      expect(req.request.method).toBe('PUT');
      httpMock.verify();
    }));
  });

  describe('remove', () => {
    it('should be removed', inject([CourseDataService], (service: CourseDataService) => {
      const removedCourseId = 3;

      service.remove(removedCourseId).subscribe();

      const req = httpMock.expectOne(`${BASE_URL}/${removedCourseId}`);
      req.flush('');
      expect(req.request.method).toBe('DELETE');
      httpMock.verify();
    }));
  });
});
