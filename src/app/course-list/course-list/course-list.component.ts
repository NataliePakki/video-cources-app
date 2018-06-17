import { Component, OnInit } from '@angular/core';
import { CourseItem } from '../models/course-item';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courseListsItems: CourseItem [];
 // tslint:disable-next-line:max-line-length
 fakeDescription = 'The quick brown fox jumps over the lazy dogT he quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog';

  constructor() {
    // tslint:disable-next-line:max-line-length
    this.courseListsItems = [
      new CourseItem(1, 'Video Cource 1', this.fakeDescription, 28, '05.29.2017'),
      new CourseItem(2, 'Video Cource 2', this.fakeDescription, 30, '05.29.2016')
    ];
   }

  ngOnInit() {
  }

}
