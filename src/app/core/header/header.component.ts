import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private getUserInfoSubscription: Subscription;
  private authSubscription: Subscription;
  userInfo$: Observable<string>;
  isAuth = false;

  constructor(private router: Router, private authService: AuthService) {
    this.userInfo$ = this.authService.getUserInfo().pipe(map((user) => user.login));
    this.authSubscription = this.authService.auth().subscribe((isAuth) => this.isAuth = isAuth);
  }

  logOff(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.getUserInfoSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }
}
