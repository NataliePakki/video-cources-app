import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseItem } from '../models/course-item';
import { CourseDataService } from '../../services';
import { CourseItemInterface } from '../models/course-item.model';
import { Subscription, Subject } from 'rxjs';
import { skip, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit, OnDestroy {
  courseListsItems: CourseItem [];
  private size = 5;
  private removeSubscription: Subscription;
  private getWithParamsSubscription: Subscription;
  private findSubscription: Subscription;
  find = new Subject<string>();
  findValue = '';

  constructor(private courseDataService: CourseDataService) {
    this.courseListsItems = [];
    const self = this;
    this.findSubscription = this.find.asObservable().pipe(skip(3)).pipe(debounceTime(500)).subscribe((value) => {
      self.findValue = value;
      self.init();
    });
  }

  onDelete(id: number) {
    if (confirm('Do you really want to delete this course?')) {
      const self = this;
      this.removeSubscription = this.courseDataService.remove(id).subscribe(function() {
        self.init();
      });
    }
  }

  loadMoreCourses() {
    this.size += 5;
    this.init();
  }

  init() {
    this.courseDataService.getWithParams(this.findValue, this.size.toString()).subscribe((res: CourseItemInterface[]) => {
      this.courseListsItems = res;
    });
  }

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    this.removeSubscription && this.removeSubscription.unsubscribe();
    this.getWithParamsSubscription && this.getWithParamsSubscription.unsubscribe();
    this.findSubscription && this.findSubscription.unsubscribe();
  }
}
