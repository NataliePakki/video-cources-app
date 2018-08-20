import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { skip, debounceTime } from 'rxjs/operators';

import { Course } from './models/course';
import { CourseDataService, LoadingService } from '../services';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {
  courses: Course [];
  find = new Subject<string>();
  findValue = '';
  isLoadMore = false;
  size: number;
  private DEFAULT_SIZE = 5;
  private removeSubscription: Subscription;
  private getWithParamsSubscription: Subscription;
  private findSubscription: Subscription;
  private countSubscription: Subscription;


  constructor(private courseDataService: CourseDataService, private loadingService: LoadingService) {
    this.courses = [];
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
    this.isLoadMore = this.size < this.courses.length;
  }

  init() {
    this.loadingService.start();
    this.courseDataService.getWithParams(this.findValue).subscribe((res: Course[]) => {
      this.courses = res;
      this.size = this.DEFAULT_SIZE;
      this.isLoadMore = this.size < this.courses.length;
      this.loadingService.stop();
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
