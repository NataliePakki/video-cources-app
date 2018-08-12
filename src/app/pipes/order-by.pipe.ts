import { Pipe, PipeTransform } from '@angular/core';
import { CourseItemInterface } from '../course-list/models/course-item.model';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(courses: CourseItemInterface[], sortBy?: string): any {
    if (courses) {
      if (sortBy === 'creationDate') {
        return courses.sort(function(a, b) {
          if (new Date(a.creationDate).getTime() > new Date(b.creationDate).getTime()) {
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
}
