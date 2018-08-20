import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../courses/models/course';

@Pipe({
  name: 'find'
})
export class FindPipe implements PipeTransform {

  transform(courses: Course[], findValue: string): Course[] {
    return courses.filter(function(course) {
      if (course.author.indexOf(findValue) > -1 || course.title.indexOf(findValue) > -1 || course.description.indexOf(findValue) > -1) {
        return course;
      }
    });
  }
}
