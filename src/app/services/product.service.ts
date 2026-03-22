import { Injectable, signal, computed } from '@angular/core';
import { Product, CartItem } from '../models/product.model';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Rose Hydrating Serum', category: 'Serums', price: 48, rating: 4.9, image: '🌹', description: 'Deep hydration with natural rose extracts.', inStock: true, featured: true },
    { id: 2, name: 'Vitamin C Cream', category: 'Moisturizers', price: 52, rating: 4.8, image: '🍊', description: 'Brighten and even your skin tone.', inStock: true },
    { id: 3, name: 'Gentle Cleanser', category: 'Cleansers', price: 28, rating: 4.7, image: '🫧', description: 'Mild formula for daily face wash.', inStock: true },
    { id: 4, name: 'Retinol Night Mask', category: 'Masks', price: 65, rating: 4.9, image: '🌙', description: 'Anti-aging treatment while you sleep.', inStock: false },
    { id: 5, name: 'Green Tea Toner', category: 'Cleansers', price: 32, rating: 4.8, image: '🍵', description: 'Refresh and soothe oily skin.', inStock: true },
    { id: 6, name: 'Collagen Boost', category: 'Serums', price: 78, rating: 5.0, image: '✨', description: 'Firm and plump for youthful skin.', inStock: true, featured: true },
    { id: 7, name: 'Clay Detox Mask', category: 'Masks', price: 42, rating: 4.6, image: '🧖‍♀️', description: 'Deep pore cleansing and detox.', inStock: true },
    { id: 8, name: 'Hyaluronic Acid', category: 'Serums', price: 38, rating: 4.9, image: '💧', description: 'Maximum hydration boost.', inStock: true }
  ];

  // Using Angular Signals for efficient state management
  private cartItems = signal<CartItem[]>([]);
  
  public cart = this.cartItems.asReadonly();
  public cartCount = computed(() => this.cartItems().reduce((acc, item) => acc + item.quantity, 0));
  public cartTotal = computed(() => this.cartItems().reduce((acc, item) => acc + (item.price * item.quantity), 0));

  getProducts(): Observable<Product[]> {
    // Simulate API delay
    return of(this.products).pipe(delay(500));
  }

  addToCart(product: Product) {
    this.cartItems.update(items => {
      const existing = items.find(i => i.id === product.id);
      if (existing) {
        return items.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...items, { ...product, quantity: 1 }];
    });
  }

  removeFromCart(productId: number) {
    this.cartItems.update(items => items.filter(i => i.id !== productId));
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.cartItems.update(items => items.map(i => i.id === productId ? { ...i, quantity } : i));
  }

  clearCart() {
    this.cartItems.set([]);
  }
}
