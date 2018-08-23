import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromRoot from '../../auth/reducers';
import * as authAction from '../../auth/actions/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private getUserInfoSubscription: Subscription;
  private authSubscription: Subscription;
  userInfo$: Observable<string>;
  isAuth$;

  constructor(private authStore: Store<fromRoot.State>) {
    this.userInfo$ = this.authStore.pipe(select(fromRoot.getUser), map((user) => user.login));
    this.isAuth$ = this.authStore.pipe(select(fromRoot.getLoggedIn));
  }

  logOff(): void {
    this.authStore.dispatch(new authAction.Logout());
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.getUserInfoSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }
}
