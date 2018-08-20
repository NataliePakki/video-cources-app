import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { CourseDataService, EventService } from '../../services';
import { Course } from '../models/course';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit, OnDestroy {
  private updateCourseSubscription: Subscription;
  @Input() model = new Course(0, '', '', '');
  constructor(private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    private eventService: EventService,
    private courseDataService: CourseDataService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseDataService.get(+params['id']).subscribe((res: Course) => {
        this.model = res;
        this.route.routeConfig.data['breadcrumb'] = this.model.title;
        this.eventService.broadcast('refreshBreadcrumbs');
        this.cd.detectChanges();
      });
   });
  }
  onSubmit() {
    const self = this;
    this.updateCourseSubscription = this.courseDataService.update(this.model).subscribe(function() {
      self.router.navigate(['/courses/list']);
    });
  }

  ngOnDestroy() {
    this.updateCourseSubscription.unsubscribe();
  }
}
