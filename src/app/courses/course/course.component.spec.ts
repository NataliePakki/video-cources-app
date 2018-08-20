import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

import { CourseComponent } from './course.component';
import { Course } from '../models/course';
import { FindPipe, FormatDurationPipe, OrderByPipe } from '../../pipes';
import { HighlightDirective } from '../../directives';

const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

class ActivatedRouteStub {}

const firstCourse: Course = new Course(1, 'title', 'author', 'description', 13, '10.10.2018', true);
const secondCourse: Course = new Course(1, 'title', 'author', 'description', 13, '10.10.2018');
@Component ({
  template: `
    <app-course *ngFor="let item of courseListss"
      [course]="item"
      (delete)="onDelete($event)">
    </app-course>`
})
class TestHostComponent {
  public courseListss: Course[] = [
    firstCourse,
    secondCourse
  ];
  public deletedElement: number;
  public onDelete(id: number) {
    this.deletedElement = id;
  }
}

describe('CourseComponent', () => {
  let hostComponent: TestHostComponent ;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterModule],
      providers: [ FindPipe, OrderByPipe, FormatDurationPipe,
        { provide: Router, userValue: mockRouter },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }, ],
      declarations: [ HighlightDirective, FindPipe, OrderByPipe, FormatDurationPipe, CourseComponent, TestHostComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
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
    expect(firstCourseElement.query(By.css('.title')).nativeElement.textContent).toBe(firstCourse.title.toUpperCase());
    expect(firstCourseElement.query(By.css('.description')).nativeElement.textContent).toBe(firstCourse.description);
    expect(firstCourseElement.query(By.css('.author')).nativeElement.textContent).toBe('Author: ' + firstCourse.author);
    expect(firstCourseElement.query(By.css('.duration')).nativeElement.textContent).toBe('Duration: ' + firstCourse.duration + 'min.');
    expect(firstCourseElement.query(By.css('.date')).nativeElement.textContent).toBe('Date: ' + firstCourse.creationDate);
    expect(firstCourseElement.classes.rated).toBeTruthy();

    expect(secondCourseElement.classes.rated).toBeFalsy();

  });

  it('should delete course', () => {
    const deleteButton = fixture.debugElement.query(By.css('.delete'));
    deleteButton.triggerEventHandler('click', null);
    expect(hostComponent.deletedElement).toBe(firstCourse.id);
  });

  it('should delete course event preventDefault', () => {
    const deleteButton = fixture.debugElement.query(By.css('.delete'));
    const spyPreventDefault = jasmine.createSpy('preventDefault');
    deleteButton.triggerEventHandler('click', { preventDefault : spyPreventDefault });
    expect(hostComponent.deletedElement).toBe(firstCourse.id);
    expect(spyPreventDefault).toHaveBeenCalled();

  });
});
