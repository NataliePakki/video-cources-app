import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../courses/models/course';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(courses: Course[], sortBy?: string): any {
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
