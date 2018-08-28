import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { LoadingService } from '../../services';
import { UserInteface } from '../models/user.model';
import { User, Authenticate } from '../models/user';
import * as fromRoot from '../store/';
import * as authAction from '../store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  model: UserInteface = new User(0, '', '');

  constructor(private authStore: Store<fromRoot.State>, private loadingService: LoadingService) { }

  ngOnInit() {
  }

  login() {
    const self = this;
    self.loadingService.start();
    this.authStore.dispatch(new authAction.Login(new Authenticate(this.model.login, this.model.password)));
  }

  ngOnDestroy() {
  }
}
