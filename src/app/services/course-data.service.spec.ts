import { TestBed, inject } from '@angular/core/testing';

import { CourseDataService } from './course-data.service';
import { CourseItem } from '../course-list/models/course-item';

describe('CourseDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ CourseDataService ]
    });
  });

  it('should be created', inject([CourseDataService], (service: CourseDataService) => {
    expect(service).toBeTruthy();
    expect(service.getAll().length).toEqual(3);
  }));

  describe('get', () => {
    it('should return course when exist', inject([CourseDataService], (service: CourseDataService) => {
      const firstCourse = service.get(1);
      const secondCourse = service.get(2);
      const thirdCourse = service.get(3);

      expect(firstCourse).toBeTruthy();
      expect(secondCourse).toBeTruthy();
      expect(thirdCourse).toBeTruthy();
    }));
    it('should return undefiened when not exist', inject([CourseDataService], (service: CourseDataService) => {
      const course = service.get(4);

      expect(course).toBeUndefined();
    }));
  });

  describe('add', () => {
    it('should be added', inject([CourseDataService], (service: CourseDataService) => {
      const addedCourseId = 5;
      const course = new CourseItem(addedCourseId, 'title', 'author', 'description');

      const isAdded = service.add(course);

      const addedCourse = service.get(addedCourseId);
      expect(addedCourse).toEqual(course);
      expect(isAdded).toBe(true);
    }));

    it('should not be added when course id exist', inject([CourseDataService], (service: CourseDataService) => {
      const addedCourseId = 3;
      const course = new CourseItem(addedCourseId, 'title', 'author', 'description');

      const isAdded = service.add(course);

      const addedCourse = service.get(addedCourseId);
      expect(addedCourse).not.toBe(course);
      expect(isAdded).toBe(false);
    }));
  });

  describe('update', () => {
    it('should be updated', inject([CourseDataService], (service: CourseDataService) => {
      const updatedCourseId = 3;

      const updatedCourse = new CourseItem(updatedCourseId, 'title', 'author', 'description');

      const isUpdated = service.update(updatedCourse);

      expect(service.get(updatedCourseId)).toEqual(updatedCourse);
      expect(isUpdated).toBe(true);
    }));

    it('should not be updated when course not exist', inject([CourseDataService], (service: CourseDataService) => {
      const updatedCourseId = 4;

      const updatedCourse = new CourseItem(updatedCourseId, 'title', 'author', 'description');

      const isUpdated = service.update(updatedCourse);

      expect(service.get(updatedCourseId)).toBeUndefined();
      expect(isUpdated).toBe(false);
    }));
  });

  describe('remove', () => {
    it('should be removed', inject([CourseDataService], (service: CourseDataService) => {
      const removedCourseId = 3;

      const isRemoved = service.remove(removedCourseId);

      expect(service.get(removedCourseId)).toBeUndefined();
      expect(isRemoved).toBe(true);
    }));

    it('should not be removed when course not exist', inject([CourseDataService], (service: CourseDataService) => {
      const removedCourseId = 4;

      const isRemoved = service.remove(removedCourseId);

      expect(service.get(removedCourseId)).toBeUndefined();
      expect(isRemoved).toBe(false);
    }));
  });
});
