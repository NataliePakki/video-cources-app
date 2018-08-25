import { createEntityAdapter } from '@ngrx/entity';
import { Course } from '../models/course';

export const adapter = createEntityAdapter<Course>();

export const {
    selectIds: selectCourseIds,
    selectEntities: selectCourseEntities,
    selectAll: selectAllCourses,
    selectTotal: coursesCount

 } = adapter.getSelectors();

