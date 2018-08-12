import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseListItemComponent } from './create-course-list-item.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

class ActivatedRouteStub {}

describe('CreateCourseListItemComponent', () => {
  let component: CreateCourseListItemComponent;
  let fixture: ComponentFixture<CreateCourseListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [ CreateCourseListItemComponent ],
      providers: [
        { provide: Router, userValue: mockRouter },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCourseListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
