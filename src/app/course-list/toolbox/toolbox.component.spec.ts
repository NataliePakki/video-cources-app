import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolboxComponent } from './toolbox.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('ToolboxComponent', () => {
  let component: ToolboxComponent;
  let fixture: ComponentFixture<ToolboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ ToolboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolboxComponent);
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
    expect(component).toBeTruthy();
    expect(component.findValue).toBe('');

    const inputElement = fixture.debugElement.query(By.css('input[name="findValue"]')).nativeElement;
    inputElement.value = 'Find';
    inputElement.dispatchEvent(new Event('input'));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.findValue).toEqual('Find');
    });
    const findButton = fixture.debugElement.query(By.css('button#find'));
    findButton.triggerEventHandler('click', null);
    // TODO: add tests when findButton will be implemented
  });
});
