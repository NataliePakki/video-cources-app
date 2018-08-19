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
  find = new Subject<string>();
  findValue = '';
  isLoadMore = false;
  private DEFAULT_SIZE = 5;
  private size: number;
  private removeSubscription: Subscription;
  private getWithParamsSubscription: Subscription;
  private findSubscription: Subscription;
  private countSubscription: Subscription;


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
    this.isLoadMore = this.size < this.courseListsItems.length;
  }

  init() {
    this.courseDataService.getWithParams(this.findValue).subscribe((res: CourseItemInterface[]) => {
      this.courseListsItems = res;
      this.size = this.DEFAULT_SIZE;
      this.isLoadMore = this.size < this.courseListsItems.length;
    });
  }

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    this.removeSubscription && this.removeSubscription.unsubscribe();
    this.getWithParamsSubscription && this.getWithParamsSubscription.unsubscribe();
    this.findSubscription && this.findSubscription.unsubscribe();
    this.countSubscription && this.countSubscription.unsubscribe();
  }
}
