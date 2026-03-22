import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cart-overlay" *ngIf="isOpen" (click)="close()"></div>
    
    <div class="cart-drawer" *ngIf="isOpen">
      <div class="cart-header">
        <h2>Your Cart ({{ productService.cartCount() }})</h2>
        <button class="close-btn" (click)="close()">✕</button>
      </div>

      <div class="cart-items" *ngIf="productService.cart().length > 0; else emptyCart">
        <div class="cart-item" *ngFor="let item of productService.cart()">
          <div class="item-img">{{ item.image }}</div>
          <div class="item-details">
            <h4>{{ item.name }}</h4>
            <p>{{ item.price | currency }}</p>
            <div class="quantity-controls">
              <button (click)="productService.updateQuantity(item.id, item.quantity - 1)">-</button>
              <span>{{ item.quantity }}</span>
              <button (click)="productService.updateQuantity(item.id, item.quantity + 1)">+</button>
            </div>
          </div>
          <button class="remove-btn" (click)="productService.removeFromCart(item.id)">🗑️</button>
        </div>
      </div>

      <ng-template #emptyCart>
        <div class="empty-state">
          <span>🛒</span>
          <p>Your cart is empty</p>
          <button (click)="close()">Start Shopping</button>
        </div>
      </ng-template>

      <div class="cart-footer" *ngIf="productService.cart().length > 0">
        <div class="total">
          <span>Total:</span>
          <span>{{ productService.cartTotal() | currency }}</span>
        </div>
        <button class="checkout-btn" (click)="checkout()">Checkout Now</button>
      </div>
    </div>
  `,
  styles: [`
    .cart-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); z-index: 1000;
    }
    .cart-drawer {
      position: fixed; top: 0; right: 0; width: 400px; height: 100%;
      background: white; z-index: 1001; display: flex; flex-direction: column;
      box-shadow: -10px 0 30px rgba(0,0,0,0.1);
    }
    @media (max-width: 480px) { .cart-drawer { width: 100%; } }

    .cart-header {
      padding: 1.5rem; border-bottom: 1px solid #f3f4f6;
      display: flex; justify-content: space-between; align-items: center;
    }
    .cart-header h2 { font-size: 1.25rem; margin: 0; color: #111827; }
    .close-btn { background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #6b7280; }

    .cart-items { flex: 1; overflow-y: auto; padding: 1.5rem; }
    .cart-item {
      display: flex; gap: 1rem; align-items: center; margin-bottom: 1.5rem;
      padding-bottom: 1.5rem; border-bottom: 1px solid #f3f4f6;
    }
    .item-img {
      width: 70px; height: 70px; background: #fdf2f8; border-radius: 12px;
      display: flex; align-items: center; justify-content: center; font-size: 2rem;
    }
    .item-details { flex: 1; }
    .item-details h4 { margin: 0 0 0.25rem; font-size: 1rem; }
    .item-details p { margin: 0 0 0.75rem; color: #ec4899; font-weight: 600; }

    .quantity-controls { display: flex; align-items: center; gap: 1rem; }
    .quantity-controls button {
      width: 24px; height: 24px; border-radius: 50%; border: 1px solid #e5e7eb;
      background: white; cursor: pointer; display: flex; align-items: center; justify-content: center;
    }
    .quantity-controls span { font-weight: 600; width: 20px; text-align: center; }

    .remove-btn { background: none; border: none; cursor: pointer; opacity: 0.5; transition: opacity 0.2s; }
    .remove-btn:hover { opacity: 1; }

    .empty-state {
      height: 100%; display: flex; flex-direction: column; align-items: center;
      justify-content: center; color: #6b7280;
    }
    .empty-state span { font-size: 4rem; margin-bottom: 1rem; }
    .empty-state button {
      margin-top: 1.5rem; background: #ec4899; color: white; border: none;
      padding: 10px 25px; border-radius: 30px; cursor: pointer;
    }

    .cart-footer { padding: 1.5rem; border-top: 1px solid #f3f4f6; background: #f9fafb; }
    .total {
      display: flex; justify-content: space-between; font-size: 1.25rem;
      font-weight: 700; margin-bottom: 1.5rem; color: #111827;
    }
    .checkout-btn {
      width: 100%; background: #ec4899; color: white; border: none;
      padding: 15px; border-radius: 12px; font-size: 1rem; font-weight: 600;
      cursor: pointer; transition: background 0.2s;
    }
    .checkout-btn:hover { background: #db2777; }
  `]
})
export class CartComponent implements OnInit, OnDestroy {
  productService = inject(ProductService);
  isOpen = false;

  private toggleListener = () => {
    this.isOpen = !this.isOpen;
  };

  ngOnInit() {
    window.addEventListener('toggleCart', this.toggleListener);
  }

  ngOnDestroy() {
    window.removeEventListener('toggleCart', this.toggleListener);
  }

  close() {
    this.isOpen = false;
  }

  checkout() {
    alert('Thank you for your purchase! Your order is being processed.');
    this.productService.clearCart();
    this.close();
  }
}
