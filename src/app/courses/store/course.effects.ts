import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { CourseDataService } from '../../services/course-data.service';

import {
  Load,
  LoadFail,
  LoadSuccess,
  AddCourseSuccess,
  AddCourseFail,
  CoursesActionTypes,
  RemoveCourse,
  RemoveCourseFail,
  RemoveCourseSuccess,
  AddCourse,
} from './course.actions';
import { Course } from '../models/course';
import { CourseState } from './course.states';

@Injectable()
export class CoursesEffects {
  @Effect()
  loadCourses$: Observable<Action> = this.actions$.pipe(
    ofType(CoursesActionTypes.Load),
    map((action: Load) => action.payload.textFragment),
    mergeMap((textParameter: string) => this.courseService.getWithParams(textParameter)),
    map((courses: Course[]) => new LoadSuccess({ courses })),
    catchError(error => of(new LoadFail(error))
    )
  );
  @Effect()
  addCourse$: Observable<Action> = this.actions$.pipe(
    ofType(CoursesActionTypes.AddCourse),
    map((action: AddCourse) => action.payload),
    mergeMap(course =>
        this.courseService.add(course)
        .pipe(
          map(() => new AddCourseSuccess([course])),
          catchError(() => of(new AddCourseFail([course])))
        )
    )
  );

  @Effect()
  removeCourse$: Observable<Action> = this.actions$.pipe(
    ofType(CoursesActionTypes.RemoveCourse),
    map((action: RemoveCourse) => action.payload),
    mergeMap(id =>
        this.courseService.remove(id)
        .pipe(
          map(() => new RemoveCourseSuccess(id)),
          catchError(() => of(new RemoveCourseFail(id)))
        )
    )
  );

  constructor(private actions$: Actions, private courseService: CourseDataService) {}
}
