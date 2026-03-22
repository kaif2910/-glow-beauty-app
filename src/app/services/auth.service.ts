import { Injectable, signal, computed } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, of, throwError, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<User | null>(null);
  
  public user = this.currentUser.asReadonly();
  public isLoggedIn = computed(() => !!this.currentUser());

  constructor() {
    // Initializing user state from localStorage
    const savedUser = localStorage.getItem('glow_user');
    if (savedUser) {
      this.currentUser.set(JSON.parse(savedUser));
    }
  }

  register(fullName: string, email: string, password: string): Observable<User> {
    const users = this.getUsers();
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return throwError(() => new Error('User already exists with this email.'));
    }

    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      fullName,
      email,
      password, // In a real app, this would be hashed on the server
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('glow_users_db', JSON.stringify(users));
    
    // Auto login after registration
    this.loginState(newUser);
    return of(newUser).pipe(delay(800));
  }

  login(email: string, password: string): Observable<User> {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      this.loginState(user);
      return of(user).pipe(delay(800));
    } else {
      return throwError(() => new Error('Invalid email or password.'));
    }
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('glow_user');
  }

  private loginState(user: User) {
    const userToSave = { ...user };
    delete userToSave.password; // Security: Never save password in frontend state/storage
    this.currentUser.set(userToSave);
    localStorage.setItem('glow_user', JSON.stringify(userToSave));
  }

  private getUsers(): any[] {
    const users = localStorage.getItem('glow_users_db');
    return users ? JSON.parse(users) : [];
  }
}
