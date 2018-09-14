import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject, Observable } from 'rxjs';
import { skip, debounceTime } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { Course } from './models/course';

import * as fromCourse from './store/courses/course.reducer';
import * as coursesAction from './store/courses/course.actions';
import { CourseState } from './store/courses/course.state';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {
  courses$: Observable<Course[]>;
  courseCount$: Observable<number>;
  find = new Subject<string>();
  findValue = '';
  isLoadMore = false;
  size: number;
  private DEFAULT_SIZE = 5;
  private findSubscription: Subscription;

  constructor(private courseStore: Store<CourseState>) {
    const self = this;
    this.findSubscription = this.find.asObservable().pipe(skip(3)).pipe(debounceTime(500)).subscribe((value) => {
      self.findValue = value;
      self.init();
    });
  }

  onDelete(id: number) {
    if (confirm('Do you really want to delete this course?')) {
      this.courseStore.dispatch(new coursesAction.RemoveCourse(id));
    }
  }

  loadMoreCourses() {
    this.size += 5;
  }

  init() {
    this.courseStore.dispatch(new coursesAction.Load({textFragment: this.findValue}));
    this.size = this.DEFAULT_SIZE;
  }

  ngOnInit() {
    this.init();
    this.courses$ = this.courseStore.pipe(select(fromCourse.selectAllCourses));
    this.courseCount$ = this.courseStore.pipe(select(fromCourse.coursesCount));
  }

  ngOnDestroy() {
    this.findSubscription && this.findSubscription.unsubscribe();
  }
}
