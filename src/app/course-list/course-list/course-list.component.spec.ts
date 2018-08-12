import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListComponent } from './course-list.component';
import { FormsModule } from '@angular/forms';

import { By } from '@angular/platform-browser';
import { CourseItem } from '../models/course-item';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, Output, EventEmitter } from '@angular/core';
import { HighlightDirective } from '../../directives';
import { FindPipe, OrderByPipe } from '../../pipes';
import { CourseDataService } from '../../services';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({
  selector: 'app-course-list-item',
  template: '<div class="course"></div>'
})
class MockCourseListItemComponent {
  @Input() courseListItem: CourseItem;
  @Output() delete = new EventEmitter();
}

const fakeCourseList = [
  new CourseItem(1, 'Video Cource 1', 'Natalie Pakki', this.fakeDescription, 28, '2018-10-29', true),
  new CourseItem(2, 'Video Cource 2', 'Natalie Pakki', this.fakeDescription, 30, '2018-5-30'),
];

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
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
        MockCourseListItemComponent,
        CourseListComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();

    stubCourseDataService = TestBed.get(CourseDataService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.courseListsItems.length).toBe(2);
    const courseListItemElements = fixture.debugElement.queryAll(By.css('.course'));
    expect(courseListItemElements.length).toBe(2);
    expect(fixture.debugElement.queryAll(By.css('app-toolbox'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('button'))).toBeTruthy();
  });

  it('should load more courses', () => {
    // const button = fixture.debugElement.query(By.css('button'));
    // button.triggerEventHandler('click', null);
    // TODO: add tests when loadMoreCourses button will be implemented
  });

  it('should call find function', () => {
    const findValue = 'Find';
    component.onFind(findValue);

    expect(component.findValue).toBe(findValue);
    expect(stubCourseDataService.isGetWithParamsCalled).toBeTruthy();
    expect(stubCourseDataService.findParam).toBe(findValue);
  });

  it('should emit deleteCourse', () => {
    const deletedCourseId = 2;
    spyOn(window, 'confirm').and.returnValue(true);

    const course = fixture.debugElement.query(By.css('app-course-list-item'));
    course.triggerEventHandler('delete', deletedCourseId);

    expect(stubCourseDataService.isRemoveCalled).toBeTruthy();
    expect(stubCourseDataService.isGetWithParamsCalled).toBeTruthy();
  });

  it('should emit deleteCourse, not delete if user not confirm', () => {
    const deletedCourseId = 2;
    stubCourseDataService.isRemoveCalled = false;
    stubCourseDataService.isGetWithParamsCalled = false;
    spyOn(window, 'confirm').and.returnValue(false);

    const course = fixture.debugElement.query(By.css('app-course-list-item'));
    course.triggerEventHandler('delete', deletedCourseId);

    expect(stubCourseDataService.isRemoveCalled).toBeFalsy();
    expect(stubCourseDataService.isGetWithParamsCalled).toBeFalsy();
  });
});
