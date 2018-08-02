import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseDataService, EventService } from '../../services';
import { CourseItem } from '../models/course-item';

@Component({
  selector: 'app-edit-course-list-item',
  templateUrl: './edit-course-list-item.component.html',
  styleUrls: ['./edit-course-list-item.component.css']
})
export class EditCourseListItemComponent implements OnInit {
  @Input() model = new CourseItem(0, '', '', '');
  constructor(private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    private eventService: EventService,
    private courseDataService: CourseDataService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.model = this.courseDataService.get(+params['id']);
      this.route.routeConfig.data['breadcrumb'] = this.model.title;
      this.eventService.broadcast('refreshBreadcrumbs');
      this.cd.detectChanges();
   });
  }
  onSubmit() {
    this.courseDataService.update(this.model);
    this.router.navigate(['/courses/list']);
  }
}
