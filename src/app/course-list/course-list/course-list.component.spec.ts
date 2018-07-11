import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListComponent } from './course-list.component';
import { FormsModule } from '@angular/forms';

import { By } from '@angular/platform-browser';
import { CourseItem } from '../models/course-item';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, Output, EventEmitter } from '@angular/core';
import { OrderByPipe } from '../../pipes/order-by.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';
import { FindPipe } from '../../pipes/find.pipe';

@Component({
  selector: 'app-course-list-item',
  template: '<div class="course"></div>'
})
class MockCourseListItemComponent {
  @Input() courseListItem: CourseItem;
  @Output() delete = new EventEmitter();
}

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let spyFindPipe: jasmine.Spy;

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
    })
    .compileComponents();
    spyFindPipe = spyOn(FindPipe.prototype, 'transform');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.courseListsItems.length).toBe(3);
    expect(component.allCourseListsItems.length).toBe(3);
    const courseListItemElements = fixture.debugElement.queryAll(By.css('.course'));
    expect(courseListItemElements.length).toBe(3);
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
    component.onFind(findValue);
    expect(spyFindPipe).toHaveBeenCalledWith(component.allCourseListsItems, findValue);
  });

  it('should emit deleteCourse', () => {
    const course = fixture.debugElement.query(By.css('app-course-list-item'));
    course.triggerEventHandler('delete', 1);
    // TODO: add tests when delete function will be implemented
  });
});
