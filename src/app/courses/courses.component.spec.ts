import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { CoursesComponent } from './courses.component';
import { Course } from './models/course';
import { HighlightDirective } from '../directives';
import { FindPipe, OrderByPipe } from '../pipes';
import * as coursesAction from './store/course.actions';


@Component({
  selector: 'app-course-list-item',
  template: '<div class="course"></div>'
})
class MockCoursesComponent {
  @Input() courses: Course;
  @Output() delete = new EventEmitter();
}

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let testStore;

  beforeEach(async(() => {
    testStore = {
      pipe: jasmine.createSpy('pipe'),
      dispatch: jasmine.createSpy('dispatch')
    };

    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule ],
      providers: [ FindPipe, OrderByPipe, { provide: Store, useValue: testStore } ],
      declarations: [
        HighlightDirective,
        OrderByPipe,
        MockCoursesComponent,
        CoursesComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();

    testStore = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    testStore = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const action = new coursesAction.Load({ textFragment: '' });
    expect(testStore.dispatch).toHaveBeenCalledWith(action);
  });

  it('should load more courses', () => {
    const button = fixture.debugElement.query(By.css('button'));
    component.isLoadMore = true;
    fixture.detectChanges();

    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.size).toBe(10);
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
    component.courses$ = 
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
