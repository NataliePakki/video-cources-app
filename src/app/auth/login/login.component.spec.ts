import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule } from '../../../../node_modules/@angular/forms';
import { Router } from '../../../../node_modules/@angular/router';
import { AuthService } from '../../services/auth.service';

class MockAuthService extends AuthService {}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useClass: MockAuthService}
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
        const spyLogin = spyOn(MockAuthService.prototype, 'login');
        const spyLog = spyOn(console, 'log');

        component.login();

        expect(spyLogin).toHaveBeenCalled();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/courses/list']);
        expect(spyLog).toHaveBeenCalledWith('logged in successfully');
      }));
  });
});
