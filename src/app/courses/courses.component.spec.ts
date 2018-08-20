import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { CoursesComponent } from './courses.component';
import { Course } from './models/course';
import { HighlightDirective } from '../directives';
import { FindPipe, OrderByPipe } from '../pipes';
import { CourseDataService } from '../services';

@Component({
  selector: 'app-course-list-item',
  template: '<div class="course"></div>'
})
class MockCoursesComponent {
  @Input() courses: Course;
  @Output() delete = new EventEmitter();
}

const fakeCourseList = [
  new Course(1, 'Video Cource 1', 'Natalie Pakki', this.fakeDescription, 28, '2018-10-29', true),
  new Course(2, 'Video Cource 2', 'Natalie Pakki', this.fakeDescription, 30, '2018-5-30'),
  new Course(3, 'Video Cource 3', 'Natalie Pakki', this.fakeDescription, 30, '2018-5-30'),
  new Course(4, 'Video Cource 4', 'Natalie Pakki', this.fakeDescription, 30, '2018-5-30'),
  new Course(5, 'Video Cource 5', 'Natalie Pakki', this.fakeDescription, 30, '2018-5-30'),
  new Course(6, 'Video Cource 6', 'Natalie Pakki', this.fakeDescription, 30, '2018-5-30'),
];

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let stubCourseDataService;

  beforeEach(async(() => {
    stubCourseDataService = {
        isGetWithParamsCalled: false,
        findParam: '',
        size: '5',
        isRemoveCalled: false,
        getWithParams(findValue: string, size: string) {
          this.isGetWithParamsCalled = true;
          this.size = size;
          this.findParam = findValue;
          return of(fakeCourseList);
        },
        remove() {
          this.isRemoveCalled = true;
          return of({});
        }
      };

    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule ],
      providers: [ FindPipe, OrderByPipe, { provide: CourseDataService, useValue: stubCourseDataService } ],
      declarations: [
        HighlightDirective,
        OrderByPipe,
        MockCoursesComponent,
        CoursesComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();

    stubCourseDataService = TestBed.get(CourseDataService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.courses.length).toBe(6);
    const courseElements = fixture.debugElement.queryAll(By.css('app-course'));
    expect(courseElements.length).toBe(5);
    expect(fixture.debugElement.queryAll(By.css('app-toolbox'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('button'))).toBeTruthy();
  });

  it('should load more courses', () => {
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    const courseElements = fixture.debugElement.queryAll(By.css('app-course'));
    expect(courseElements.length).toBe(6);
    expect(fixture.debugElement.query(By.css('button'))).toBeFalsy();
  });

  // TODO: how to test with skip and debounceTime?
  // it('should call find function', () => {
  //   const findValue = 'F';
  //   // component.onFind(findValue);

  //   expect(component.findValue).toBe(findValue);
  //   expect(stubCourseDataService.isGetWithParamsCalled).toBeTruthy();
  //   expect(stubCourseDataService.findParam).toBe(findValue);
  // });

  it('should emit deleteCourse', () => {
    const deletedCourseId = 2;
    spyOn(window, 'confirm').and.returnValue(true);

    const course = fixture.debugElement.query(By.css('app-course'));
    course.triggerEventHandler('delete', deletedCourseId);

    expect(stubCourseDataService.isRemoveCalled).toBeTruthy();
    expect(stubCourseDataService.isGetWithParamsCalled).toBeTruthy();
  });

  it('should emit deleteCourse, not delete if user not confirm', () => {
    const deletedCourseId = 2;
    stubCourseDataService.isRemoveCalled = false;
    stubCourseDataService.isGetWithParamsCalled = false;
    spyOn(window, 'confirm').and.returnValue(false);

    const course = fixture.debugElement.query(By.css('app-course'));
    course.triggerEventHandler('delete', deletedCourseId);

    expect(stubCourseDataService.isRemoveCalled).toBeFalsy();
    expect(stubCourseDataService.isGetWithParamsCalled).toBeFalsy();
  });
});
