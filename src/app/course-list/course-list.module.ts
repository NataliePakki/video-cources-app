import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseListItemComponent } from './course-list-item/course-list-item.component';
import { ToolboxComponent } from './toolbox/toolbox.component';
import { FormsModule } from '@angular/forms';
import { FindPipe } from '../pipes/find.pipe';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { HighlightDirective } from '../directives/highlight.directive';
import { FormatDurationPipe } from '../pipes/format-duration.pipe';
import { CreateCourseListItemComponent } from './create-course-list-item/create-course-list-item.component';
import { RouterModule } from '../../../node_modules/@angular/router';
import { DateComponent } from './create-course-list-item/date/date.component';
import { AuthorComponent } from './create-course-list-item/author/author.component';
import { DurationComponent } from './create-course-list-item/duration/duration.component';

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
