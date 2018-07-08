import { Pipe, PipeTransform } from '@angular/core';
import { CourseItemInterface } from '../course-list/models/course-item.model';

@Pipe({
  name: 'find'
})
export class FindPipe implements PipeTransform {

  transform(courses: CourseItemInterface[], findValue: string): CourseItemInterface[] {
    return courses.filter(function(course) {
      return course;
    });
  }
}
