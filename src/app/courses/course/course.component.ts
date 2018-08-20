import { Component, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../models/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {
  @Input() course: Course;
  @Output() delete = new EventEmitter<number>();
  starImagePath: string;

  deleteCourse(event: any) {
    event && event.preventDefault();
    this.delete.emit(this.course.id);
  }
  constructor() {
    this.starImagePath = '../../../assets/images/start_icon.svg';
   }

  ngOnInit() {
  }

}
