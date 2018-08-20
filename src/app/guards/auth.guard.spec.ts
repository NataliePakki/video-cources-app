import { TestBed, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { Router, RouterModule } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../services';

const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

let stubAuthService = {
  auth() {
    return of({});
  }
};

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ AuthGuard,
        { provide: Router, userValue: mockRouter },
        { provide: AuthService, useValue: stubAuthService}
      ]
    });
    stubAuthService = TestBed.get(AuthService);
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));


  it('should redirect to login if not authorize', inject([AuthGuard], (guard: AuthGuard) => {
    stubAuthService.auth = function() {
      return of(false);
    };
    guard.canActivate().toPromise().then(() => {
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/login']);
    });
  }));

  it('should redirect to login if error', inject([AuthGuard], (guard: AuthGuard) => {
    stubAuthService.auth = function() {
      return throwError('');
    };
    guard.canActivate().toPromise().then(() => {
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/login']);
    });
  }));

  it('should return true if  authorize', inject([AuthGuard], (guard: AuthGuard) => {
    stubAuthService.auth = function() {
      return of(true);
    };
    guard.canActivate().toPromise().then((res) => {
      expect(res).toBeTruthy();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });
  }));
});
