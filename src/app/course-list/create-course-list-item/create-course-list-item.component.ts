import { Component, OnInit } from '@angular/core';
import { CourseItem } from '../models/course-item';

@Component({
  selector: 'app-create-course-list-item',
  templateUrl: './create-course-list-item.component.html',
  styleUrls: ['./create-course-list-item.component.css']
})
export class CreateCourseListItemComponent implements OnInit {
  model = new CourseItem(0, '', '', '');

  constructor() {}

  ngOnInit() {
  }

  onSubmit() {}
}
