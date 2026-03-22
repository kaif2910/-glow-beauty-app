import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { KebabCasePipe } from '../../kebab-case-pipe';
import { GlowHighlightDirective } from '../../glow-highlight';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, KebabCasePipe, GlowHighlightDirective],
  template: `
    <div class="product-card" [class.featured]="product.featured" appGlow>
      <div class="product-badge" *ngIf="product.featured">Best Seller</div>
      <div class="product-image">
        <span>{{ product.image }}</span>
      </div>
      
      <div class="product-info">
        <div class="category">{{ product.category }}</div>
        <h3>{{ product.name }}</h3>
        <p class="slug">/shop/{{ product.name | kebabCase }}</p>
        <p class="description">{{ product.description }}</p>
        
        <div class="rating">
          <span class="stars">⭐ {{ product.rating }}</span>
          <span class="stock-status" [class.out-of-stock]="!product.inStock">
            {{ product.inStock ? 'In Stock' : 'Sold Out' }}
          </span>
        </div>
        
        <div class="card-footer">
          <span class="price">{{ product.price | currency:'USD' }}</span>
          <button 
            class="add-btn" 
            [disabled]="!product.inStock"
            (click)="addToCart.emit(product)">
            {{ product.inStock ? 'Add to Cart' : 'Unavailable' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-card {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      position: relative;
      border: 1px solid #f9fafb;
    }
    .product-card:hover { transform: translateY(-8px); box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
    .product-card.featured { border: 2px solid #ec4899; }
    
    .product-badge {
      position: absolute; top: 10px; right: 10px; background: #ec4899; color: white;
      padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; z-index: 10;
    }

    .product-image {
      height: 200px; display: flex; align-items: center; justify-content: center;
      background: #fdf2f8; font-size: 5rem;
    }

    .product-info { padding: 1.5rem; }
    .category { font-size: 0.75rem; text-transform: uppercase; color: #ec4899; font-weight: 700; margin-bottom: 0.5rem; }
    .product-info h3 { font-size: 1.25rem; margin-bottom: 0.25rem; color: #111827; }
    .slug { font-size: 0.7rem; color: #9ca3af; margin-bottom: 0.75rem; font-family: monospace; }
    .description { font-size: 0.9rem; color: #6b7280; line-height: 1.4; margin-bottom: 1rem; height: 2.8em; overflow: hidden; }

    .rating { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
    .stars { font-weight: 600; color: #fbbf24; }
    .stock-status { font-size: 0.8rem; font-weight: 500; color: #10b981; }
    .stock-status.out-of-stock { color: #ef4444; }

    .card-footer { display: flex; justify-content: space-between; align-items: center; }
    .price { font-size: 1.5rem; font-weight: 700; color: #111827; }
    
    .add-btn {
      background: #111827; color: white; border: none; padding: 10px 20px;
      border-radius: 10px; cursor: pointer; font-weight: 600; transition: background 0.2s;
    }
    .add-btn:hover:not(:disabled) { background: #ec4899; }
    .add-btn:disabled { background: #d1d5db; cursor: not-allowed; }
  `]
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() addToCart = new EventEmitter<Product>();
}
