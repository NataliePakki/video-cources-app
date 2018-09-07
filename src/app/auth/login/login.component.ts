import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FormBuilder, Validators } from '@angular/forms';

import { Authenticate } from '../models/user';
import * as fromRoot from '../store/';
import * as authAction from '../store/auth.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  error$ = this.authStore.pipe(select(fromRoot.getLoginError));
  errorSubscription: Subscription;

  user = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private authStore: Store<fromRoot.State>, private fb: FormBuilder) {
    this.errorSubscription = this.error$.subscribe(() => {
      this.user.controls.login.setErrors({'incorrect': true});
      this.user.controls.password.setErrors({'incorrect': true});
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.authStore.dispatch(new authAction.Login(new Authenticate(this.user.value.login, this.user.value.password)));
  }

  ngOnDestroy() {
    this.errorSubscription && this.errorSubscription.unsubscribe();
  }
}
