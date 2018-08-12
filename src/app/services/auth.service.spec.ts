// import { TestBed, inject } from '@angular/core/testing';

// import { AuthService } from './auth.service';

// describe('AuthService', () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [AuthService]
//     });
//   });

//   it('should be created', inject([AuthService], (service: AuthService) => {
//     expect(service).toBeTruthy();
//   }));

//   describe('logout', () => {
//     it('should remove user-login and token values from localStorage', inject([AuthService], (service: AuthService) => {
//       const spyRemoveItem = spyOn(localStorage, 'removeItem');

//       service.logout();

//       expect(spyRemoveItem).toHaveBeenCalledWith('token');
//       expect(spyRemoveItem).toHaveBeenCalledWith('user-login');
//     }));
//   });

//   describe('login', () => {
//     it('should set user-login and token values to localStorage', inject([AuthService], (service: AuthService) => {
//       const spyRemoveItem = spyOn(localStorage, 'setItem');
//       const userName = 'userName';

//       service.login(userName);

//       expect(spyRemoveItem).toHaveBeenCalledWith('token', jasmine.any(String));
//       expect(spyRemoveItem).toHaveBeenCalledWith('user-login', userName);
//     }));
//   });

//   describe('getUserInfo', () => {
//     it('should return user-login', inject([AuthService], (service: AuthService) => {
//       const userLogin = 'user';
//       spyOn(localStorage, 'getItem').and.returnValue(userLogin);

//       const userInfo = service.getUserInfo();

//       expect(userInfo).toBe(userLogin);
//     }));
//   });

//   describe('isAuthenticated', () => {
//     it('should return true when user-login and token exist', inject([AuthService], (service: AuthService) => {
//       spyOn(localStorage, 'getItem').and.returnValue('value');

//       const isAuthenticated = service.isAuthenticated();

//       expect(isAuthenticated).toBe(true);
//     }));

//     it('should return false when user-login doesnt exist', inject([AuthService], (service: AuthService) => {
//       spyOn(localStorage, 'getItem').and.callFake(function(value) {
//         if (value === 'user-login') {
//           return undefined;
//         } else {
//           return 'value';
//         }
//       });

//       const isAuthenticated = service.isAuthenticated();

//       expect(isAuthenticated).toBe(false);
//     }));

//     it('should return false when token doesnt exist', inject([AuthService], (service: AuthService) => {
//       spyOn(localStorage, 'getItem').and.callFake(function(value) {
//         if (value === 'token') {
//           return undefined;
//         } else {
//           return 'value';
//         }
//       });

//       const isAuthenticated = service.isAuthenticated();

//       expect(isAuthenticated).toBe(false);
//     }));
//   });
// });
