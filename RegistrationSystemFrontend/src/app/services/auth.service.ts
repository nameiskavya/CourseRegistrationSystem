import { Injectable } from '@angular/core';

interface User {
  username: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: User[] = [
    { username: 'Clerk', password: 'clerkpassword', role: 'Clerk' },
    { username: 'Admin', password: 'adminpassword', role: 'Admin' },
  ];
  
  private isAuthenticated = false;
  private userRole = '';

  authenticate(username: string, password: string): boolean {
    const user = this.users.find(user => user.username === username && user.password === password);

    if (user) {
      this.isAuthenticated = true;
      this.userRole = user.role;
      return true;
    } else {
      this.isAuthenticated = false;
      this.userRole = '';
      return false;
    }
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUserRole(): string {
    return this.userRole;
  }
}