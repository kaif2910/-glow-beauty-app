import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="navbar">
      <div class="logo" routerLink="/">
        <span class="logo-icon">🌸</span>
        <div class="logo-text">
          <h1>Glow Beauty</h1>
          <p>RADIANCE REDEFINED</p>
        </div>
      </div>
      
      <div class="nav-actions">
        <ng-container *ngIf="authService.isLoggedIn(); else authLinks">
          <div class="user-info">
            <span class="welcome">Hi, {{ authService.user()?.fullName }}</span>
            <button class="logout-btn" (click)="authService.logout()">Logout</button>
          </div>
        </ng-container>
        
        <ng-template #authLinks>
          <div class="auth-links">
            <a routerLink="/login" class="nav-link">Login</a>
            <a routerLink="/signup" class="nav-btn">Sign Up</a>
          </div>
        </ng-template>

        <div class="cart-trigger" (click)="toggleCart()">
          <span class="cart-icon">🛒</span>
          <span class="cart-badge" *ngIf="productService.cartCount() > 0">
            {{ productService.cartCount() }}
          </span>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 5%;
      background: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .logo { display: flex; align-items: center; gap: 0.8rem; cursor: pointer; }
    .logo-icon { font-size: 2rem; }
    .logo-text h1 { font-size: 1.5rem; margin: 0; color: #ec4899; }
    .logo-text p { font-size: 0.7rem; margin: 0; letter-spacing: 2px; color: #6b7280; }
    
    .nav-actions { display: flex; align-items: center; gap: 1.5rem; }
    
    .user-info { display: flex; align-items: center; gap: 1rem; }
    .welcome { font-size: 0.9rem; font-weight: 500; color: #374151; }
    .logout-btn { 
      background: none; border: 1px solid #d1d5db; padding: 6px 12px; 
      border-radius: 8px; font-size: 0.85rem; cursor: pointer; 
    }
    .logout-btn:hover { background: #f9fafb; color: #ef4444; border-color: #ef4444; }

    .auth-links { display: flex; align-items: center; gap: 1rem; }
    .nav-link { font-size: 0.9rem; font-weight: 600; color: #4b5563; }
    .nav-btn { 
      background: #ec4899; color: white; padding: 8px 18px; 
      border-radius: 20px; font-size: 0.9rem; font-weight: 600; 
    }

    .cart-trigger {
      position: relative;
      cursor: pointer;
      font-size: 1.5rem;
      transition: transform 0.2s;
    }
    .cart-trigger:hover { transform: scale(1.1); }
    .cart-badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background: #ec4899;
      color: white;
      font-size: 0.7rem;
      padding: 2px 6px;
      border-radius: 10px;
      font-weight: bold;
    }
  `]
})
export class HeaderComponent {
  productService = inject(ProductService);
  authService = inject(AuthService);

  toggleCart() {
    const event = new CustomEvent('toggleCart');
    window.dispatchEvent(event);
  }
}
