import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

const stubAuthService = {
  login() {
    return of({});
  }
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: stubAuthService}
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('login', () => {
    it('should call login of AuthService and navigate to courses', inject([Router], (router: Router) => {
        const spyLog = spyOn(console, 'log');

        component.login();

        expect(mockRouter.navigate).toHaveBeenCalledWith(['/courses/list']);
        expect(spyLog).toHaveBeenCalledWith('logged in successfully');
      }));
  });
});
