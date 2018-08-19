import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AuthService } from '../../services';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';


let stubAuthService = jasmine.createSpyObj('AuthService', ['login', 'logout', 'auth', 'getUserInfo']);

const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [
          HeaderComponent
        ],
      providers: [
        { provide: AuthService, useValue: stubAuthService },
        { provide: Router, useValue: mockRouter },
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

    stubAuthService = TestBed.get(AuthService);
    stubAuthService.auth.and.returnValue(of(true));
    stubAuthService.getUserInfo.and.returnValue(of({}));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('init', () => {
      it('should has userName and logOff button when user is authenticated', () => {
        stubAuthService.auth.and.returnValue(of(true));
        fixture.detectChanges();

        const userLoginElement = fixture.debugElement.query(By.css('#user-login'));
        const logOffButton = fixture.debugElement.query(By.css('#logOff'));
        const loginButton = fixture.debugElement.query(By.css('#login'));


        expect(userLoginElement).toBeDefined();
        expect(logOffButton).toBeDefined();
        expect(loginButton).toBeNull();
      });

      it('should has login button when user is not authenticated', () => {
        stubAuthService.auth.and.returnValue(of(false));
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        const userLoginElement = fixture.debugElement.query(By.css('#user-login'));
        const logOffButton = fixture.debugElement.query(By.css('#logOff'));
        const loginButton = fixture.debugElement.query(By.css('#login'));


        expect(userLoginElement).toBeNull();
        expect(logOffButton).toBeNull();
        expect(loginButton).toBeDefined();
      });
  });

  describe('logOff', () => {
    it('should call logout of AuthService and navigate to login', () => {
        const userName = 'user';
        let isLogoutCalled = false;
        stubAuthService.logout = function() {
            isLogoutCalled = true;
        };
        stubAuthService.getUserInfo.and.returnValue(of(userName));
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        const logOffButton = fixture.debugElement.query(By.css('#logOff'));
        logOffButton.triggerEventHandler('click', null);

        expect(isLogoutCalled).toBeTruthy();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/login']);
      });
  });
});
