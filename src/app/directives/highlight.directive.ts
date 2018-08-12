import { Directive, Input, ElementRef, Renderer } from '@angular/core';
import { CourseItemInterface } from '../course-list/models/course-item.model';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private el: ElementRef, private render: Renderer) {}

  @Input('appHighlight') set appHighlight(courseItem: CourseItemInterface) {
    let color = null;

    const currDate = new Date();
    const currTime = currDate.getTime();
    const freshTime = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate() - 14).getTime();

    const courseTime = new Date(courseItem.creationDate).getTime();

    if (courseTime <= currTime &&  courseTime >= freshTime) {
      color = 'rgba(0, 165, 114, 0.5)';

    } else if (courseTime > currTime) {
      color = 'rgba(87, 160, 211, 0.5)';
    }

    if (color != null) {
      this.render.setElementStyle(this.el.nativeElement, 'border-color', color);
    }
  }
}
