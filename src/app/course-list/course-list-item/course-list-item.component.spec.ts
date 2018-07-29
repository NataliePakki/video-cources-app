import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListItemComponent } from './course-list-item.component';
import { Component } from '@angular/core';
import { CourseItem } from '../models/course-item';
import { By } from '@angular/platform-browser';
import { OrderByPipe } from '../../pipes/order-by.pipe';
import { FindPipe } from '../../pipes/find.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';
import { FormatDurationPipe } from '../../pipes/format-duration.pipe';

const firstCourseItem: CourseItem = new CourseItem(1, 'title', 'author', 'description', 13, new Date(2018, 10, 10), true);
const secondCourseItem: CourseItem = new CourseItem(1, 'title', 'author', 'description', 13, new Date(2018, 10, 10));
@Component ({
  template: `
    <app-course-list-item *ngFor="let item of courseListsItems"
      [courseListItem]="item"
      (delete)="onDelete($event)">
    </app-course-list-item>`
})
class TestHostComponent {
  public courseListsItems: CourseItem[] = [
    firstCourseItem,
    secondCourseItem
  ];
  public deletedElement: number;
  public onDelete(id: number) {
    this.deletedElement = id;
  }
}

describe('CourseListItemComponent', () => {
  let hostComponent: TestHostComponent ;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ FindPipe, OrderByPipe, FormatDurationPipe ],
      declarations: [ HighlightDirective, FindPipe, OrderByPipe, FormatDurationPipe, CourseListItemComponent, TestHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(hostComponent).toBeTruthy();
    const courseElements = fixture.debugElement.queryAll(By.css('.course'));
    expect(courseElements.length).toBe(2);
    const firstCourseElement = courseElements[0];
    const secondCourseElement = courseElements[1];

    const deleteButton = firstCourseElement.query(By.css('.delete'));
    expect(deleteButton).toBeTruthy();
    expect(firstCourseElement.query(By.css('.title')).nativeElement.textContent).toBe(firstCourseItem.title.toUpperCase());
    expect(firstCourseElement.query(By.css('.description')).nativeElement.textContent).toBe(firstCourseItem.description);
    expect(firstCourseElement.query(By.css('.author')).nativeElement.textContent).toBe('Author: ' + firstCourseItem.author);
    expect(firstCourseElement.query(By.css('.duration')).nativeElement.textContent).toBe('Duration: ' + firstCourseItem.duration + 'min.');
    expect(firstCourseElement.query(By.css('.date')).nativeElement.textContent).toBe('Date: ' + (firstCourseItem.creationDate.getMonth() + 1) + '.' + firstCourseItem.creationDate.getDate() + '.' + firstCourseItem.creationDate.getFullYear());
    expect(firstCourseElement.classes.rated).toBeTruthy();

    expect(secondCourseElement.classes.rated).toBeFalsy();

  });

  it('should delete course', () => {
    const deleteButton = fixture.debugElement.query(By.css('.delete'));
    deleteButton.triggerEventHandler('click', null);
    expect(hostComponent.deletedElement).toBe(firstCourseItem.id);
  });

  it('should delete course event preventDefault', () => {
    const deleteButton = fixture.debugElement.query(By.css('.delete'));
    const spyPreventDefault = jasmine.createSpy('preventDefault');
    deleteButton.triggerEventHandler('click', { preventDefault : spyPreventDefault });
    expect(hostComponent.deletedElement).toBe(firstCourseItem.id);
    expect(spyPreventDefault).toHaveBeenCalled();

  });
});
