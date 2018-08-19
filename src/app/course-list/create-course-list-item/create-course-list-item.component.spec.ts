import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseListItemComponent } from './create-course-list-item.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CourseDataService } from '../../services';

let mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

describe('CreateCourseListItemComponent', () => {
  let component: CreateCourseListItemComponent;
  let fixture: ComponentFixture<CreateCourseListItemComponent>;
  let stubCourseDataService;

  beforeEach(async(() => {
    stubCourseDataService = {
      isAddCalled: false,
      add() {
        this.isAddCalled = true;
        return of({});
      }
    };
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [ CreateCourseListItemComponent ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: CourseDataService, useValue: stubCourseDataService }

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    stubCourseDataService = TestBed.get(CourseDataService);
    mockRouter = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCourseListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add course and navigate to courses/list', () => {
    component.onSubmit();

    expect(stubCourseDataService.isAddCalled).toBeTruthy();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['courses/list']);

  });
});
