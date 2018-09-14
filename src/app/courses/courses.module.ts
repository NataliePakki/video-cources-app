import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CourseComponent } from './course/course.component';
import { CoursesComponent } from './courses.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { AuthorsComponent, DurationComponent, DateComponent } from './shared';
import { ToolboxComponent } from './toolbox/toolbox.component';
import { FindPipe, OrderByPipe, FormatDurationPipe } from '../pipes';
import { HighlightDirective } from '../directives';
import { CourseDataService } from './services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [ FindPipe, OrderByPipe, CourseDataService ],
  declarations: [ HighlightDirective, CoursesComponent, CourseComponent, ToolboxComponent, FormatDurationPipe, OrderByPipe, FindPipe, CreateCourseComponent, DateComponent, AuthorsComponent, DurationComponent, EditCourseComponent ],
  exports: [ CoursesComponent ]
})
export class CoursesModule { }
