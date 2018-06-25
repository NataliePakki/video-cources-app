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
    this.courseListsItems = [];
  }

  onDelete(id: number) {
    console.log('Delete course:' + id);
  }

  loadMoreCourses() {
    console.log('Load more courses');
  }

  ngOnInit() {
    this.courseListsItems = [
      new CourseItem(1, 'Video Cource 1', 'Natalie Pakki', this.fakeDescription, 28, '05.29.2017'),
      new CourseItem(2, 'Video Cource 2', 'Natalie Pakki', this.fakeDescription, 30, '05.29.2016'),
      new CourseItem(3, 'Video Cource 3', 'Natalie Pakki', this.fakeDescription, 450, '07.29.2016')
    ];
  }
}
