import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { EventService } from '../../services';
import { Course } from '../models/course';
import { CourseState } from '../store/courses/course.state';
import * as fromCourse from '../store/courses/course.reducer';
import { UpdateCourse } from '../store/courses/course.actions';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit, OnDestroy {
  private getCourseSubscripion: Subscription;
  course;
  constructor(private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private eventService: EventService,
    private courseStore: Store<CourseState>,
    private fb: FormBuilder) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getCourseSubscripion = this.courseStore.pipe(select(fromCourse.selectCourse(+params['id']))).subscribe(course => {
        this.course = this.createFormGroup(course);
        this.route.routeConfig.data['breadcrumb'] = this.course.title;
        this.eventService.broadcast('refreshBreadcrumbs');
        this.cd.detectChanges();
      });
   });
  }
  onSubmit() {
    const course = this.course.value;
    this.courseStore.dispatch(new UpdateCourse(course));
  }

  createFormGroup(course: Course): FormGroup {
    return this.fb.group({
              id: course.id,
              title: [ course.title, [ Validators.required, Validators.maxLength(50), Validators.minLength(2) ]],
              authors: [ course.authors, Validators.required ],
              creationDate: [ course.creationDate, Validators.required ],
              duration: [ course.duration, Validators.required ],
              description: [ course.description, [ Validators.required, Validators.maxLength(500)] ]
            });
  }

  ngOnDestroy() {
    this.getCourseSubscripion.unsubscribe();
  }
}
