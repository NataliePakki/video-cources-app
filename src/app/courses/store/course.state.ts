import { EntityState } from '@ngrx/entity';
import { Course } from '../models/course';

export interface CourseState extends EntityState<Course> {}
