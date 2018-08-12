import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseItem } from '../models/course-item';
import { CourseDataService } from '../../services';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-course-list-item',
  templateUrl: './create-course-list-item.component.html',
  styleUrls: ['./create-course-list-item.component.css']
})
export class CreateCourseListItemComponent implements OnInit, OnDestroy {
  model = new CourseItem(0, '', '', '');
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
