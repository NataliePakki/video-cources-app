import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AuthService } from '../../services';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';


class MockAuthService extends AuthService {}

const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          HeaderComponent
        ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
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
        spyOn(MockAuthService.prototype, 'isAuthenticated').and.returnValue(true);
        fixture.detectChanges();


        const userLoginElement = fixture.debugElement.query(By.css('#user-login'));
        const logOffButton = fixture.debugElement.query(By.css('#logOff'));
        const loginButton = fixture.debugElement.query(By.css('#login'));


        expect(userLoginElement).toBeDefined();
        expect(logOffButton).toBeDefined();
        expect(loginButton).toBeNull();
      });

      it('should has login button when user is not authenticated', () => {
        spyOn(MockAuthService.prototype, 'isAuthenticated').and.returnValue(false);
        fixture.detectChanges();

        const userLoginElement = fixture.debugElement.query(By.css('#user-login'));
        const logOffButton = fixture.debugElement.query(By.css('#logOff'));
        const loginButton = fixture.debugElement.query(By.css('#login'));


        expect(userLoginElement).toBeNull();
        expect(logOffButton).toBeNull();
        expect(loginButton).toBeDefined();
      });
  });

  describe('isAuthenticated', () => {
    it('should call isAuthenticated of AuthService', () => {
        const spyIsAuthenticated = spyOn(MockAuthService.prototype, 'isAuthenticated');

        component.isAuthenticated();

        expect(spyIsAuthenticated).toHaveBeenCalled();
      });
  });

  describe('getUserInfo', () => {
    it('should call getUserInfo of AuthService', () => {
        const spyGetUserInfo = spyOn(MockAuthService.prototype, 'getUserInfo');

        component.getUserInfo();

        expect(spyGetUserInfo).toHaveBeenCalled();
      });
  });

  describe('logOff', () => {
    it('should call logout of AuthService and navigate to login', () => {
        const userName = 'user';
        const spyLogout = spyOn(MockAuthService.prototype, 'logout');
        const spyGetUserInfo = spyOn(MockAuthService.prototype, 'getUserInfo').and.returnValue(userName);
        spyOn(MockAuthService.prototype, 'isAuthenticated').and.returnValue(true);
        fixture.detectChanges();

        const spyLog = spyOn(console, 'log');

        const logOffButton = fixture.debugElement.query(By.css('#logOff'));
        logOffButton.triggerEventHandler('click', null);

        expect(spyLogout).toHaveBeenCalled();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/login']);
        expect(spyGetUserInfo).toHaveBeenCalled();
        expect(spyLog).toHaveBeenCalledWith('User "' + userName + '" logoff.');
      });
  });
});
