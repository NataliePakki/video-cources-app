import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) { }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logOff(): void {
    const userInfo = this.authService.getUserInfo();
    this.authService.logout();
    console.log('User "' + userInfo + '" logoff.');
    this.router.navigate(['/auth/login']);
  }

  getUserInfo(): string {
    return this.authService.getUserInfo();
  }
  ngOnInit() {
  }

}
