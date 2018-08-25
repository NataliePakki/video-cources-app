import { Action } from '@ngrx/store';
import { Course } from '../models/course';

export enum CoursesActionTypes {
  AddCourse = '[Courses] Add Course',
  AddCourseSuccess = '[Courses] Add Course Success',
  AddCourseFail = '[Courses] Add Course Fail',
  RemoveCourse = '[Courses] Remove Course',
  RemoveCourseSuccess = '[Courses] Remove Course Success',
  RemoveCourseFail = '[Courses] Remove Course Fail',
  Load = '[Courses] Load',
  LoadSuccess = '[Courses] Load Success',
  LoadFail = '[Courses] Load Fail',
}

/**
 * Add Course to Courses Actions
 */
export class AddCourse implements Action {
  readonly type = CoursesActionTypes.AddCourse;

  constructor(public payload: Course) {}
}

export class AddCourseSuccess implements Action {
  readonly type = CoursesActionTypes.AddCourseSuccess;

  constructor(public payload: Course[]) {}
}

export class AddCourseFail implements Action {
  readonly type = CoursesActionTypes.AddCourseFail;

  constructor(public payload: Course[]) {}
}

/**
 * Remove Course from Courses Actions
 */
export class RemoveCourse implements Action {
  readonly type = CoursesActionTypes.RemoveCourse;

  constructor(public payload: number) {}
}

export class RemoveCourseSuccess implements Action {
  readonly type = CoursesActionTypes.RemoveCourseSuccess;

  constructor(public payload: number) {}
}

export class RemoveCourseFail implements Action {
  readonly type = CoursesActionTypes.RemoveCourseFail;

  constructor(public payload: number) {}
}

/**
 * Load Courses Actions
 */
export class Load implements Action {
  readonly type = CoursesActionTypes.Load;

  constructor(public payload: { textFragment: string} ) {}

}
export class LoadSuccess implements Action {
  readonly type = CoursesActionTypes.LoadSuccess;

  constructor(public payload: {courses: Course[]}) {}
}

export class LoadFail implements Action {
  readonly type = CoursesActionTypes.LoadFail;

  constructor(public payload: any) {}
}

export type CoursesActions =
  | AddCourse
  | AddCourseSuccess
  | AddCourseFail
  | RemoveCourse
  | RemoveCourseSuccess
  | RemoveCourseFail
  | Load
  | LoadSuccess
  | LoadFail;
