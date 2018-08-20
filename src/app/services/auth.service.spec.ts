import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { AuthService } from './auth.service';

const BASE_URL = 'http://localhost:3004/auth';

describe('AuthService', () => {
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ AuthService ]
    });

    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  describe('logout', () => {
    it('should remove user-login and token values from localStorage', inject([AuthService], (service: AuthService) => {
      const spyRemoveItem = spyOn(localStorage, 'removeItem');

      service.logout();

      expect(spyRemoveItem).toHaveBeenCalledWith('token');
      expect(spyRemoveItem).toHaveBeenCalledWith('user-login');
    }));
  });

  describe('login', () => {
    it('should set user-login and token values to localStorage', inject([AuthService], (service: AuthService) => {
      const spyRemoveItem = spyOn(localStorage, 'setItem');
      const login = 'login';
      const password = 'password';
      const data = { token: 'token' };

      service.login(login, password).subscribe(() => {
          expect(spyRemoveItem).toHaveBeenCalledWith('token', data.token);
      });

      const req = httpMock.expectOne(`${BASE_URL}/login`);
      req.flush(data);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({login: login, password: password});
      httpMock.verify();
    }));
  });

  describe('getUserInfo', () => {
    it('should return user-login', inject([AuthService], (service: AuthService) => {
      const login = 'login';

      service.getUserInfo().subscribe();

      const req = httpMock.expectOne(`${BASE_URL}/userinfo`);
      req.flush(null);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(null);
      httpMock.verify();
    }));
  });

  describe('auth', () => {


    it('should return true', inject([AuthService], (service: AuthService) => {
      const token = 'token';
      spyOn(localStorage, 'getItem').and.callFake(function(value) {
          return token;
      });

      service.auth().subscribe((auth) => {
          expect(auth).toBeTruthy();
      });

      const req = httpMock.expectOne(`${BASE_URL}`);
      req.flush(of(true));
      expect(req.request.method).toBe('GET');
      httpMock.verify();
    }));

    it('should return false when user-login doesnt exist', inject([AuthService], (service: AuthService) => {
        spyOn(localStorage, 'getItem').and.callFake(function(value) {
            return undefined;
        });
        service.auth().subscribe((auth) => {
            expect(auth).toBeFalsy();
        });

        httpMock.expectNone(`${BASE_URL}`);
        httpMock.verify();
      }));
  });
});
