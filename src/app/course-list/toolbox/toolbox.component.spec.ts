import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolboxComponent } from './toolbox.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Component } from '../../../../node_modules/@angular/core';


@Component({
  template: '<app-toolbox (find)=onFind($event)></app-toolbox>'
})
class TestHostComponent {
  public findValue = '';
  public onFind(findValue: string) {
    this.findValue = findValue;
  }
}

describe('ToolboxComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ ToolboxComponent, TestHostComponent ]
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
    expect(component.findValue).toBe('');
    const searchForm = fixture.debugElement.query(By.css('#search'));
    expect(searchForm.query(By.css('input'))).toBeTruthy();
    expect(searchForm.query(By.css('button#find'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#add'))).toBeTruthy();
  });

  it('should find', () => {
    const findValue = 'Find';
    expect(component).toBeTruthy();
    expect(component.findValue).toBe('');

    const inputElement = fixture.debugElement.query(By.css('input[name="findValue"]')).nativeElement;
    inputElement.value = findValue;
    inputElement.dispatchEvent(new Event('input'));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.findValue).toEqual(findValue);
    });
    const findButton = fixture.debugElement.query(By.css('button#find'));
    findButton.triggerEventHandler('click', null);
    expect(component.findValue).toBe(findValue);
  });
});
