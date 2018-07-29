import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseListItemComponent } from './create-course-list-item.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('CreateCourseListItemComponent', () => {
  let component: CreateCourseListItemComponent;
  let fixture: ComponentFixture<CreateCourseListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ CreateCourseListItemComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
