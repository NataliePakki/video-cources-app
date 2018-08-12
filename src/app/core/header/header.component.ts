import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private getUserInfoSubscription: Subscription;
  userInfo = '';
  constructor(private router: Router, private authService: AuthService) {
    const self = this;
    this.getUserInfoSubscription = this.authService.getUserInfo().subscribe(function(user) {
      self.userInfo = user.login;
    });
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logOff(): void {
    console.log('User "' + this.userInfo + '" logoff.');
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.getUserInfoSubscription.unsubscribe();
  }

}
