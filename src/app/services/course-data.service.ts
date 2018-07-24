import { Injectable } from '@angular/core';
import { CourseItemInterface } from '../course-list/models/course-item.model';
import { CourseItem } from '../course-list/models/course-item';

@Injectable({
  providedIn: 'root'
})
export class CourseDataService {
  private courseListsItems: CourseItemInterface[] = [];
  private fakeDescription = 'The quick brown fox jumps over the lazy dogT he quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog';

  constructor() {
    this.courseListsItems = [
      new CourseItem(1, 'Video Cource 1', 'Natalie Pakki', this.fakeDescription, 28, new Date(2018, 10, 29), true),
      new CourseItem(2, 'Video Cource 2', 'Natalie Pakki', this.fakeDescription, 30, new Date(2018, 5, 30)),
      new CourseItem(3, 'Video Cource 7', 'Natalie Pakki', this.fakeDescription, 450, new Date(2016, 10, 10))
    ];
  }

  getAll(): CourseItemInterface[] {
    return this.courseListsItems;
  }

  get(id: number): CourseItemInterface {
    return this.courseListsItems.find(function(c) { return c.id === id; });
  }

  add(course: CourseItemInterface): boolean {
    if (this.get(course.id)) {
      return false;
    }
    this.courseListsItems.push(course);
    return true;
  }

  update(course: CourseItemInterface): boolean {
    for (const c of this.courseListsItems) {
      if (c.id === course.id) {
        c.author = course.author;
        c.creationDate = course.creationDate;
        c.description = course.description;
        c.duration = course.duration;
        c.title = course.title;
        c.topRated = course.topRated;
        return true;
      }
    }
    return false;
  }

  remove(id: number): boolean {
    if (this.get(id)) {
      this.courseListsItems = this.courseListsItems.filter(function(c) { return c.id !== id; });
      return true;
    }
    return false;
  }
}
