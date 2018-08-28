import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription, Observable } from 'rxjs';

import { CourseDataService, EventService } from '../../services';
import { Course } from '../models/course';
import { Store, select } from '@ngrx/store';
import { CourseState } from '../store/course.state';
import * as fromCourse from '../store/course.reducer';
import { UpdateCourse } from '../store/course.actions';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit, OnDestroy {
  private getCourseSubscripion: Subscription;
  model: Course;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    private eventService: EventService,
    private courseStore: Store<CourseState>) {}

  ngOnInit() {
    this.route.params.subscribe(params => {

      this.getCourseSubscripion = this.courseStore.pipe(select(fromCourse.selectCourse(+params['id']))).subscribe(course => {
        this.model = course;
        this.route.routeConfig.data['breadcrumb'] = this.model.title;
        this.eventService.broadcast('refreshBreadcrumbs');
        this.cd.detectChanges();
      });
   });
  }
  onSubmit() {
    this.courseStore.dispatch(new UpdateCourse(this.model));
  }

  ngOnDestroy() {
    this.getCourseSubscripion.unsubscribe();
  }
}
