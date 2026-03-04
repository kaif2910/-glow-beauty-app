import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GlowHighlightDirective } from '../glow-highlight';
import { KebabCasePipe } from '../kebab-case-pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, GlowHighlightDirective, KebabCasePipe],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent {
  storeName: string = 'Glow Beauty';
  tagline: string = 'Radiance Redefined';
  
  categories: string[] = ['All', 'Serums', 'Moisturizers', 'Cleansers', 'Masks'];
  selectedCategory: string = 'All';

  // State Management
  cartCount: number = 0;
  isCartOpen: boolean = false;

  allProducts = [
    { id: 1, name: 'Rose Hydrating Serum', category: 'Serums', price: 48, rating: 4.9, image: '🌹', inStock: true },
    { id: 2, name: 'Vitamin C Cream', category: 'Moisturizers', price: 52, rating: 4.8, image: '🍊', inStock: true },
    { id: 3, name: 'Gentle Cleanser', category: 'Cleansers', price: 28, rating: 4.7, image: '🫧', inStock: true },
    { id: 4, name: 'Retinol Night Mask', category: 'Masks', price: 65, rating: 4.9, image: '🌙', inStock: false },
    { id: 5, name: 'Green Tea Toner', category: 'Cleansers', price: 32, rating: 4.8, image: '🍵', inStock: true },
    { id: 6, name: 'Collagen Boost', category: 'Serums', price: 78, rating: 5.0, image: '✨', inStock: true }
  ];

  get filteredProducts() {
    if (this.selectedCategory === 'All') return this.allProducts;
    return this.allProducts.filter(p => p.category === this.selectedCategory);
  }

  addToCart(productName: string) {
    this.cartCount++;
    alert(`Added ${productName} to your cart!`);
  }

  filterByCategory(cat: string) {
    this.selectedCategory = cat;
  }
}
