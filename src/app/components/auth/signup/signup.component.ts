import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h2>Create Account</h2>
          <p>Join the Glow Beauty community</p>
        </div>

        <form (ngSubmit)="onSignup()" #signupForm="ngForm">
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" name="fullName" [(ngModel)]="fullName" required minlength="3" placeholder="John Doe">
          </div>

          <div class="form-group">
            <label>Email Address</label>
            <input type="email" name="email" [(ngModel)]="email" required email placeholder="your@email.com">
          </div>

          <div class="form-group">
            <label>Password</label>
            <input type="password" name="password" [(ngModel)]="password" required minlength="6" placeholder="Min 6 characters">
          </div>

          <div class="error-msg" *ngIf="error">{{ error }}</div>

          <button type="submit" [disabled]="!signupForm.form.valid || isLoading" class="auth-btn">
            {{ isLoading ? 'Creating account...' : 'Create Account' }}
          </button>
        </form>

        <div class="auth-footer">
          <p>Already have an account? <a routerLink="/login">Login</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container { display: flex; justify-content: center; align-items: center; min-height: 80vh; padding: 20px; }
    .auth-card { background: white; width: 100%; max-width: 400px; padding: 2.5rem; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
    .auth-header { text-align: center; margin-bottom: 2rem; }
    .auth-header h2 { font-size: 1.75rem; color: #111827; margin-bottom: 0.5rem; }
    .auth-header p { color: #6b7280; font-size: 0.95rem; }

    .form-group { margin-bottom: 1.25rem; }
    .form-group label { display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem; color: #374151; }
    .form-group input { 
      width: 100%; padding: 12px 16px; border: 1px solid #e5e7eb; border-radius: 12px;
      font-size: 1rem; transition: border-color 0.2s; box-sizing: border-box;
    }
    .form-group input:focus { outline: none; border-color: #ec4899; box-shadow: 0 0 0 4px rgba(236,72,153,0.1); }

    .error-msg { color: #ef4444; font-size: 0.875rem; margin-bottom: 1rem; text-align: center; }

    .auth-btn {
      width: 100%; padding: 12px; background: #ec4899; color: white; border: none;
      border-radius: 12px; font-weight: 600; cursor: pointer; font-size: 1rem;
      transition: background 0.2s; margin-top: 1rem;
    }
    .auth-btn:hover:not(:disabled) { background: #db2777; }
    .auth-btn:disabled { background: #d1d5db; cursor: not-allowed; }

    .auth-footer { text-align: center; margin-top: 1.5rem; font-size: 0.9rem; color: #6b7280; }
    .auth-footer a { color: #ec4899; font-weight: 600; text-decoration: none; }
  `]
})
export class SignupComponent {
  authService = inject(AuthService);
  router = inject(Router);

  fullName = '';
  email = '';
  password = '';
  error = '';
  isLoading = false;

  onSignup() {
    this.isLoading = true;
    this.error = '';

    this.authService.register(this.fullName, this.email, this.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.message;
      }
    });
  }
}
