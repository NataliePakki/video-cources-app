import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListItemComponent } from './course-list-item.component';
import { Component, DebugElement } from '@angular/core';
import { CourseItem } from '../models/course-item';
import { By } from '@angular/platform-browser';

const firstCourseItem: CourseItem = new CourseItem(1, 'title', 'author', 'description', 13, '10.10.2018');
const secondCourseItem: CourseItem = new CourseItem(1, 'title', 'author', 'description', 13, '10.10.2018');
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
      declarations: [ CourseListItemComponent, TestHostComponent ]
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
    const deleteButton = firstCourseElement.query(By.css('.delete'));
    expect(deleteButton).toBeTruthy();
    expect(firstCourseElement.query(By.css('.title')).nativeElement.textContent).toBe(firstCourseItem.title);
    expect(firstCourseElement.query(By.css('.description')).nativeElement.textContent).toBe(firstCourseItem.description);
    expect(firstCourseElement.query(By.css('.author')).nativeElement.textContent).toBe('Author: ' + firstCourseItem.author);
    expect(firstCourseElement.query(By.css('.duraction')).nativeElement.textContent).toBe('Duraction: ' + firstCourseItem.duraction + ' min');
    expect(firstCourseElement.query(By.css('.date')).nativeElement.textContent).toBe('Date: ' + firstCourseItem.creationDate);
  });

  it('should delete course', () => {
    const deleteButton = fixture.debugElement.query(By.css('.delete'));
    deleteButton.triggerEventHandler('click', null);
    expect(hostComponent.deletedElement).toBe(firstCourseItem.id);
  });
});
