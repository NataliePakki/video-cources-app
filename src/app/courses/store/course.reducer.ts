import {
    CoursesActionTypes,
    CoursesActions
  } from './course.actions';
import { CourseState } from './course.states';
import * as fromAdapter from './course.adapter';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const initialState: CourseState = fromAdapter.adapter.getInitialState();

export function reducer(state = initialState, action: CoursesActions): CourseState {
    switch (action.type) {
        case CoursesActionTypes.AddCourse: {
            return fromAdapter.adapter.addOne(action.payload, state);
        }

        case CoursesActionTypes.RemoveCourse: {
            return fromAdapter.adapter.removeOne(action.payload, state);
        }

        case CoursesActionTypes.LoadSuccess: {
            return fromAdapter.adapter.addAll(action.payload.courses, state);
        }

        default:
            return state;

    }
}

export const getCourseState = createFeatureSelector<CourseState>('courses');

export const selectCourseIds = createSelector(getCourseState, fromAdapter.selectCourseIds);
export const selectCourseEntities = createSelector(getCourseState, fromAdapter.selectCourseEntities);

export const selectCourse = (id: number) => createSelector(
    selectCourseEntities,
    courses => courses[id]
  );
export const selectAllCourses = createSelector(getCourseState, fromAdapter.selectAllCourses);
export const coursesCount = createSelector(getCourseState, fromAdapter.coursesCount);
