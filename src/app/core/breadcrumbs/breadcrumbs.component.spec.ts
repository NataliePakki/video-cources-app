import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { RouterModule } from '../../../../node_modules/@angular/router';
import { RouterTestingModule } from '../../../../node_modules/@angular/router/testing';
import { Component } from '../../../../node_modules/@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  template: ''
})
class MockComponent {}

class MockAuthService extends AuthService {}

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterModule, RouterTestingModule.withRoutes([ { path: 'login', component: MockComponent } ]) ],
      declarations: [ MockComponent, BreadcrumbsComponent ],
      providers: [ { provide: AuthService, useClass: MockAuthService }],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isAuthenticated', () => {
    it('should call isAuthenticated of AuthService', () => {
        const spyIsAuthenticated = spyOn(MockAuthService.prototype, 'isAuthenticated');

        component.isAuthenticated();

        expect(spyIsAuthenticated).toHaveBeenCalled();
      });
  });
});
