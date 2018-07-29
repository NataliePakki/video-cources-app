import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CourseItem } from '../models/course-item';
import { FindPipe } from '../../pipes/find.pipe';
import { CourseDataService } from '../../services/course-data.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  providers: [ CourseDataService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseListComponent implements OnInit {
  courseListsItems: CourseItem [];
  allCourseListsItems: CourseItem[];

  constructor(private findPipe: FindPipe, private courseDataService: CourseDataService) {
    this.courseListsItems = [];
  }

  onDelete(id: number) {
    if (confirm('Do you really want to delete this course?')) {
      this.courseDataService.remove(id);
      this.courseListsItems = this.courseDataService.getAll();
    }
  }

  onFind(findValue: string) {
    this.courseListsItems = this.findPipe.transform(this.courseDataService.getAll(), findValue);
  }

  loadMoreCourses() {
    console.log('Load more courses');
  }

  ngOnInit() {
    this.courseListsItems = this.courseDataService.getAll();
  }
}
