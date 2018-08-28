import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Course } from '../models/course';
import { CourseState } from '../store/course.state';
import { AddCourse } from '../store/course.actions';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit, OnDestroy {
  model = new Course(0, '', '', '');
  constructor(private store: Store<CourseState>, private router: Router) {}

  ngOnInit() {}

  onSubmit() {
    this.store.dispatch(new AddCourse(this.model));
  }

  ngOnDestroy() {}
}
