import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services';
import { Router } from '@angular/router';
import { UserInteface } from '../models/user.model';
import { User } from '../models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private loginSubscription: Subscription;
  model: UserInteface = new User(0, '', '');
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {}

  login() {
    const self = this;
    this.loginSubscription = this.authService.login(this.model.login, this.model.password).subscribe(function(data) {
      console.log('logged in successfully');
      self.router.navigate(['/courses/list']);
    });
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}
