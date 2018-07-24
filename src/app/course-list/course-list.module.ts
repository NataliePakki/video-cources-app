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

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [ FindPipe, OrderByPipe ],
  declarations: [ HighlightDirective, CourseListComponent, CourseListItemComponent, ToolboxComponent, FormatDurationPipe, OrderByPipe, FindPipe ],
  exports: [ CourseListComponent ]
})
export class CourseListModule { }
