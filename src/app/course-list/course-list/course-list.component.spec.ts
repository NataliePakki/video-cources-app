import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListComponent } from './course-list.component';
import { FormsModule } from '@angular/forms';

import { By } from '@angular/platform-browser';
import { CourseItem } from '../models/course-item';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, Output, EventEmitter } from '@angular/core';
import { OrderByPipe } from '../../pipes/order-by.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';
import { FindPipe } from '../../pipes/find.pipe';
import { CourseDataService } from '../../services/course-data.service';

@Component({
  selector: 'app-course-list-item',
  template: '<div class="course"></div>'
})
class MockCourseListItemComponent {
  @Input() courseListItem: CourseItem;
  @Output() delete = new EventEmitter();
}

const fakeCourseList = [
  new CourseItem(1, 'Video Cource 1', 'Natalie Pakki', this.fakeDescription, 28, new Date(2018, 10, 29), true),
  new CourseItem(2, 'Video Cource 2', 'Natalie Pakki', this.fakeDescription, 30, new Date(2018, 5, 30)),
];

class MockCourseDataService extends CourseDataService {
  getAll() {
    return fakeCourseList;
  }
}

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      providers: [ FindPipe, OrderByPipe ],
      declarations: [
        HighlightDirective,
        FindPipe,
        OrderByPipe,
        MockCourseListItemComponent,
        CourseListComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).overrideComponent(CourseListComponent, {
      set: {
        providers: [{ provide: CourseDataService, useClass: MockCourseDataService }
        ]
      }})
    .compileComponents();
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
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    // TODO: add tests when loadMoreCourses button will be implemented
  });

  it('should call FindPipe tranform function', () => {
    const findValue = 'Find';
    const spyFindPipe = spyOn(FindPipe.prototype, 'transform');
    component.onFind(findValue);
      expect(spyFindPipe).toHaveBeenCalledWith(fakeCourseList, findValue);
  });

  it('should emit deleteCourse', () => {
    const deletedCourseId = 2;
    spyOn(window, 'confirm').and.returnValue(true);
    const spyDeleteCourse = spyOn(MockCourseDataService.prototype, 'remove');
    const spyGetAll = spyOn(MockCourseDataService.prototype, 'getAll');

    const course = fixture.debugElement.query(By.css('app-course-list-item'));
    course.triggerEventHandler('delete', deletedCourseId);

    expect(spyDeleteCourse).toHaveBeenCalledWith(deletedCourseId);
    expect(spyGetAll).toHaveBeenCalled();
  });

  it('should emit deleteCourse, not delete if user not confirm', () => {
    const deletedCourseId = 2;
    spyOn(window, 'confirm').and.returnValue(false);
    const spyDeleteCourse = spyOn(MockCourseDataService.prototype, 'remove');
    const spyGetAll = spyOn(MockCourseDataService.prototype, 'getAll');

    const course = fixture.debugElement.query(By.css('app-course-list-item'));
    course.triggerEventHandler('delete', deletedCourseId);

    expect(spyDeleteCourse).not.toHaveBeenCalledWith(deletedCourseId);
    expect(spyGetAll).not.toHaveBeenCalled();
  });
});
