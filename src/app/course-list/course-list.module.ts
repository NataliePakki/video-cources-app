import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseListItemComponent } from './course-list-item/course-list-item.component';
import { ToolboxComponent } from './toolbox/toolbox.component';
import { FormsModule } from '@angular/forms';
import { FindPipe, OrderByPipe, FormatDurationPipe } from '../pipes';
import { HighlightDirective } from '../directives';
import { CreateCourseListItemComponent } from './create-course-list-item/create-course-list-item.component';
import { RouterModule } from '@angular/router';
import { AuthorComponent, DurationComponent, DateComponent } from './shared';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  providers: [ FindPipe, OrderByPipe ],
  declarations: [ HighlightDirective, CourseListComponent, CourseListItemComponent, ToolboxComponent, FormatDurationPipe, OrderByPipe, FindPipe, CreateCourseListItemComponent, DateComponent, AuthorComponent, DurationComponent ],
  exports: [ CourseListComponent ]
})
export class CourseListModule { }
