import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseDataService, EventService } from '../../services';
import { CourseItem } from '../models/course-item';
import { CourseItemInterface } from '../models/course-item.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-course-list-item',
  templateUrl: './edit-course-list-item.component.html',
  styleUrls: ['./edit-course-list-item.component.css']
})
export class EditCourseListItemComponent implements OnInit, OnDestroy {
  private updateCourseSubscription: Subscription;
  @Input() model = new CourseItem(0, '', '', '');
  constructor(private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    private eventService: EventService,
    private courseDataService: CourseDataService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseDataService.get(+params['id']).subscribe((res: CourseItemInterface) => {
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
