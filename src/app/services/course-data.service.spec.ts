import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CourseDataService } from './course-data.service';
import { CourseItem } from '../course-list/models/course-item';

const BASE_URL = 'http://localhost:3004/courses';

describe('CourseDataService', () => {
  let httpMock: HttpTestingController;
  const mockCourses = [
    new CourseItem(1, 'title1', 'author1', 'descr1'),
    new CourseItem(2, 'title2', 'author2', 'descr2'),
    new CourseItem(3, 'title3', 'author3', 'descr3'),
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ CourseDataService ]
    });

    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([CourseDataService], (service: CourseDataService) => {
    expect(service).toBeTruthy();
    service.getAll().subscribe((data) => {
      expect(data).toEqual(mockCourses);
    });
    httpMock.expectOne(BASE_URL).flush(mockCourses);

    httpMock.verify();
  }));

  describe('get', () => {
    it('should return course when exist', inject([CourseDataService], (service: CourseDataService) => {

      service.get(1).subscribe((data) => {
        expect(data).toEqual(mockCourses[0]);
      });
      httpMock.expectOne(BASE_URL + '/1').flush(mockCourses[0]);
      httpMock.verify();
    }));
  });

  // describe('add', () => {
  //   it('should be added', inject([CourseDataService], (service: CourseDataService) => {
  //     const addedCourseId = 4;
  //     const course = new CourseItem(addedCourseId, 'title', 'author', 'description');

  //     const isAdded = service.add(course).subscribe((data) => {
  //       const addedCourse = service.get(addedCourseId);
  //       expect(addedCourse).toEqual(course);
  //       expect(isAdded).toBe(true);
  //     });

  //     httpMock.expectOne(BASE_URL + '/1').flush(mockCourses[0]);
  //     httpMock.verify();

  //   }));

  //   it('should not be added when course id exist', inject([CourseDataService], (service: CourseDataService) => {
  //     const addedCourseId = 3;
  //     const course = new CourseItem(addedCourseId, 'title', 'author', 'description');

  //     const isAdded = service.add(course);

  //     const addedCourse = service.get(addedCourseId);
  //     expect(addedCourse).not.toBe(course);
  //     expect(isAdded).toBe(false);
  //   }));
  // });

  // describe('update', () => {
  //   it('should be updated', inject([CourseDataService], (service: CourseDataService) => {
  //     const updatedCourseId = 3;

  //     const updatedCourse = new CourseItem(updatedCourseId, 'title', 'author', 'description');

  //     const isUpdated = service.update(updatedCourse);

  //     expect(service.get(updatedCourseId)).toEqual(updatedCourse);
  //     expect(isUpdated).toBe(true);
  //   }));

  //   it('should not be updated when course not exist', inject([CourseDataService], (service: CourseDataService) => {
  //     const updatedCourseId = 4;

  //     const updatedCourse = new CourseItem(updatedCourseId, 'title', 'author', 'description');

  //     const isUpdated = service.update(updatedCourse);

  //     expect(service.get(updatedCourseId)).toBeUndefined();
  //     expect(isUpdated).toBe(false);
  //   }));
  // });

  // describe('remove', () => {
  //   it('should be removed', inject([CourseDataService], (service: CourseDataService) => {
  //     const removedCourseId = 3;

  //     const isRemoved = service.remove(removedCourseId);

  //     expect(service.get(removedCourseId)).toBeUndefined();
  //     expect(isRemoved).toBe(true);
  //   }));

  //   it('should not be removed when course not exist', inject([CourseDataService], (service: CourseDataService) => {
  //     const removedCourseId = 4;

  //     const isRemoved = service.remove(removedCourseId);

  //     expect(service.get(removedCourseId)).toBeUndefined();
  //     expect(isRemoved).toBe(false);
  //   }));
  // });
});
