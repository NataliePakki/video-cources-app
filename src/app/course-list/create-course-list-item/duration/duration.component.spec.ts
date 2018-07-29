import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationComponent } from './duration.component';
import { FormsModule } from '@angular/forms';
import { Component } from '../../../../../node_modules/@angular/core';
import { CourseItem } from '../../models/course-item';
import { FormatDurationPipe } from '../../../pipes/format-duration.pipe';

@Component ({
  template: `
    <app-duration [model]="model"></app-duration> `
})
class TestHostComponent {
  public model = new CourseItem(0, '', '', '');
}

describe('DurationComponent', () => {
  let hostComponent: TestHostComponent ;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ FormatDurationPipe, DurationComponent, TestHostComponent ]
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
