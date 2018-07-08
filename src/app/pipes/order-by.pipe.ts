import { Pipe, PipeTransform } from '@angular/core';
import { CourseItemInterface } from '../course-list/models/course-item.model';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(courses: CourseItemInterface[], sortBy?: string): any {
    if (sortBy === 'creationDate') {
      return courses.sort(function(a, b) {
        if (a.creationDate.getTime() > b.creationDate.getTime()) {
          return 1;
        } else {
          return -1;
        }
      });
    } else {
      return courses;
    }
  }
}
