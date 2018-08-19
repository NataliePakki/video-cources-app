import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolboxComponent } from './toolbox.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

@Component({
  template: '<app-toolbox [find]="find"></app-toolbox>'
})
class TestHostComponent {
  public find = new Subject<string>();
}

describe('ToolboxComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ ToolboxComponent, TestHostComponent ],
      providers: [{ provide: Router, useValue: mockRouter }],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const searchForm = fixture.debugElement.query(By.css('#search'));
    expect(searchForm.query(By.css('input'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#add'))).toBeTruthy();
  });

  it('should find', () => {
    const findValue = 'Find';
    expect(component).toBeTruthy();
    const subsciption = component.find.subscribe((val) => {
      expect(val).toBe(findValue);
    });

    const inputElement = fixture.debugElement.query(By.css('input[name="findValue"]')).nativeElement;
    inputElement.value = findValue;
    inputElement.dispatchEvent(new Event('input'));
    subsciption.unsubscribe();
  });
});
