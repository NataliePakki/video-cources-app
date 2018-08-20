import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Course } from '../models/course';
import { CourseDataService } from '../../services';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit, OnDestroy {
  model = new Course(0, '', '', '');
  private createCourseSubscription: Subscription;
  constructor(private courseDataService: CourseDataService, private router: Router) {}

  ngOnInit() {
  }
  onSubmit() {
    const self = this;
    this.createCourseSubscription = this.courseDataService.add(this.model).subscribe(function() {
      self.router.navigate(['courses/list']);
    });
  }
  ngOnDestroy() {
    this.createCourseSubscription && this.createCourseSubscription.unsubscribe();
  }
}
