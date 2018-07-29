import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateComponent } from './date.component';
import { FormsModule } from '@angular/forms';
import { Component } from '../../../../../node_modules/@angular/core';
import { CourseItem } from '../../models/course-item';
import { FormatDurationPipe } from '../../../pipes';

@Component ({
  template: `
    <app-date [model]="model"></app-date> `
})
class TestHostComponent {
  public model = new CourseItem(0, '', '', '');
}

describe('DateComponent', () => {
  let hostComponent: TestHostComponent ;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ FormatDurationPipe, DateComponent, TestHostComponent ]
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
  });
});
