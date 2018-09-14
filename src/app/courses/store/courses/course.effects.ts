import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, mergeMap, tap } from 'rxjs/operators';
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
  UpdateCourseFail,
  UpdateCourseSuccess,
  UpdateCourse,
} from './course.actions';
import { Course } from '../../models/course';

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
          map(() => new AddCourseSuccess(course)),
          catchError(() => of(new AddCourseFail(course)))
        )
    )
  );
  @Effect()
  updateCourse$: Observable<Action> = this.actions$.pipe(
    ofType(CoursesActionTypes.UpdateCourse),
    map((action: UpdateCourse) => action.payload),
    mergeMap(course =>
        this.courseService.update(course)
        .pipe(
          map(() => new UpdateCourseSuccess(course)),
          catchError(() => of(new UpdateCourseFail()))
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

  @Effect({ dispatch: false })
  addCourseSuccess$ = this.actions$.pipe(
    ofType(CoursesActionTypes.AddCourseSuccess),
    tap(() => this.router.navigate(['courses/list']))
  );

  @Effect({ dispatch: false })
  updateCourseSuccess$ = this.actions$.pipe(
    ofType(CoursesActionTypes.UpdateCourseSuccess),
    tap(() => this.router.navigate(['courses/list']))
  );

  constructor(private actions$: Actions, private courseService: CourseDataService, private router: Router) {}
}
