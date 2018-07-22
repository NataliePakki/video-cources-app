import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(userLogin: string): void {
    localStorage.setItem('user-login', userLogin);
    localStorage.setItem('token', this.generateToken());
  }

  logout(): void {
      localStorage.removeItem('user-login');
      localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('user-login') && localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  getUserInfo(): string {
    return localStorage.getItem('user-login');
  }

  private generateToken(): string {
    const stringArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B' , 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '!','?'];

    let result = '';
    for (let i = 1; i < 15; i++) {
      const rndNum = Math.ceil(Math.random() * stringArray.length) - 1;
      result = result + stringArray[rndNum];
    }
    return result;
  }
}
