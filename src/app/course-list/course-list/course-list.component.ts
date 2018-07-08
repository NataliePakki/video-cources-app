import { Component, OnInit } from '@angular/core';
import { CourseItem } from '../models/course-item';
import { FindPipe } from '../../pipes/find.pipe';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courseListsItems: CourseItem [];
  allCourseListsItems: CourseItem[];
  fakeDescription = 'The quick brown fox jumps over the lazy dogT he quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog';

  constructor(private findPipe: FindPipe) {
    this.courseListsItems = [];
    this.allCourseListsItems = [];
  }

  onDelete(id: number) {
    console.log('Delete course:' + id);
  }

  onFind(findValue: string) {
    this.courseListsItems = this.findPipe.transform(this.allCourseListsItems, findValue);
  }

  loadMoreCourses() {
    console.log('Load more courses');
  }

  ngOnInit() {
    this.courseListsItems = this.allCourseListsItems = [
      new CourseItem(1, 'Video Cource 1', 'Natalie Pakki', this.fakeDescription, 28, new Date(2018, 10, 29), true),
      new CourseItem(2, 'Video Cource 2', 'Natalie Pakki', this.fakeDescription, 30, new Date(2018, 5, 30)),
      new CourseItem(3, 'Video Cource 3', 'Natalie Pakki', this.fakeDescription, 450, new Date(2016, 10, 10))
    ];
  }
}
