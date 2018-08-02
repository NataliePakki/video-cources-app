import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseListItemComponent } from './edit-course-list-item.component';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services';

class ActivatedRouteStub {}
const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

describe('EditCourseListItemComponent', () => {
  let component: EditCourseListItemComponent;
  let fixture: ComponentFixture<EditCourseListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ EditCourseListItemComponent ],
      providers: [
        ChangeDetectorRef,
        EventService,
        { provide: Router, userValue: mockRouter },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourseListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
