import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getUsers(): User[] {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    return users
  }

  register(username: string, password: string): boolean {
    let users = this.getUsers();
    if (users.length > 0) {
      users.push({
        username: username,
        password: password
      });
      localStorage.setItem('users', JSON.stringify(users))
      return this.login(username, password);
    }
    localStorage.setItem('users', JSON.stringify([{
      username: username,
      password: password
    }]));
    return this.login(username, password);
  }

  login(username: string, password: string): boolean {
    const authenticatedUser = this.getUsers().filter(user => user.username === username && user.password === password);
    if (authenticatedUser.length > 0) {
      localStorage.setItem('user', JSON.stringify({ username, role: "user" }));
      return true;
    }
    return false;
  }

  getLoggedInUser(): string | undefined {
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.username) {
      return user.username;
    }
    return undefined;
  }

  isLoggedIn(): boolean {
    let user = localStorage.getItem('user');
    if (user) {
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  clearAuthData() {
    localStorage.removeItem('users');
  }
}
