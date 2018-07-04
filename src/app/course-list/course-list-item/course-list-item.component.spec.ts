import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListItemComponent } from './course-list-item.component';
import { Component } from '@angular/core';
import { CourseItem } from '../models/course-item';


@Component ({
  template: `
    <app-course-list-item *ngFor="let item of courseListsItems"
      [courseListItem]="item"
      (delete)="onDelete($event)">
    </app-course-list-item>`
})
class TestHostComponent {
  public courseListsItems: CourseItem[] = [
    new CourseItem(1, 'title', 'author', 'description'),
    new CourseItem(2, 'title', 'author', 'description')
  ];
  public deletedElement: number;
  public onDelete(id: number) {
    this.deletedElement = id;
  }
}

describe('CourseListItemComponent', () => {
  let component: TestHostComponent ;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseListItemComponent, TestHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
