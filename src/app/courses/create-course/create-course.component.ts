import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';

import { CourseState } from '../store/courses/course.state';
import { AddCourse } from '../store/courses/course.actions';


@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit, OnDestroy {
  course = this.fb.group({
    id: '',
    title: [ '', [ Validators.required, Validators.maxLength(50), Validators.minLength(2) ]],
    authors: '',
    creationDate: '',
    duration: '',
    description: [ '', [ Validators.required, Validators.maxLength(500)] ]
  });
  constructor(private store: Store<CourseState>, private fb: FormBuilder) {}

  ngOnInit() {  }

  onSubmit() {
    this.store.dispatch(new AddCourse(this.course.value));
  }

  ngOnDestroy() {}
}
