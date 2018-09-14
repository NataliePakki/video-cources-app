import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
    CoursesActionTypes,
    CoursesActions
  } from './course.actions';
import { CourseState } from './course.state';
import * as fromAdapter from './course.adapter';

const initialState: CourseState = fromAdapter.adapter.getInitialState();

export function reducer(state = initialState, action: CoursesActions): CourseState {
    switch (action.type) {
        case CoursesActionTypes.AddCourseSuccess: {
            return fromAdapter.adapter.addOne(action.payload, state);
        }

        case CoursesActionTypes.RemoveCourseSuccess: {
            return fromAdapter.adapter.removeOne(action.payload, state);
        }

        case CoursesActionTypes.LoadSuccess: {
            return fromAdapter.adapter.addAll(action.payload.courses, state);
        }

        case CoursesActionTypes.UpdateCourse: {
            return fromAdapter.adapter.updateOne({ id: action.payload.id, changes: action.payload }, state);
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
