import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CourseComponent } from './course/course.component';
import { CoursesComponent } from './courses.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { AuthorComponent, DurationComponent, DateComponent } from './shared';
import { ToolboxComponent } from './toolbox/toolbox.component';
import { FindPipe, OrderByPipe, FormatDurationPipe } from '../pipes';
import { HighlightDirective } from '../directives';
import { CourseDataService } from '../services';
import { reducer } from './store/course.reducer';
import { CoursesEffects } from './store/course.effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    StoreModule.forFeature('courses', reducer),
    EffectsModule.forFeature([CoursesEffects])
  ],
  providers: [ FindPipe, OrderByPipe, CourseDataService ],
  declarations: [ HighlightDirective, CoursesComponent, CourseComponent, ToolboxComponent, FormatDurationPipe, OrderByPipe, FindPipe, CreateCourseComponent, DateComponent, AuthorComponent, DurationComponent, EditCourseComponent ],
  exports: [ CoursesComponent ]
})
export class CoursesModule { }
