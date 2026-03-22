import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  template: `
    <section class="shop-container">
      <div class="controls">
        <div class="search-bar">
          <input type="text" [(ngModel)]="searchQuery" placeholder="Search for products...">
          <span class="search-icon">🔍</span>
        </div>
        
        <div class="filter-chips">
          <button *ngFor="let cat of categories" 
                  [class.active]="selectedCategory === cat"
                  (click)="selectedCategory = cat">
            {{ cat }}
          </button>
        </div>
      </div>

      <div class="results-info">
        <p>Showing <strong>{{ filteredProducts.length }}</strong> products</p>
        <div class="sort-select">
          <label>Sort by:</label>
          <select [(ngModel)]="sortBy">
            <option value="name">Name</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div class="product-grid">
        <app-product-card 
          *ngFor="let product of filteredProducts" 
          [product]="product"
          (addToCart)="onAddToCart($event)">
        </app-product-card>
      </div>

      <div class="no-results" *ngIf="filteredProducts.length === 0">
        <div class="no-results-content">
          <span>🔎</span>
          <h3>No products found</h3>
          <p>Try adjusting your search or filters to find what you're looking for.</p>
          <button (click)="resetFilters()">Clear all filters</button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .shop-container { padding: 0 5% 60px; }
    
    .controls {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 2rem; gap: 2rem; flex-wrap: wrap;
    }
    
    .search-bar {
      flex: 1; min-width: 300px; position: relative;
    }
    .search-bar input {
      width: 100%; padding: 12px 45px 12px 20px; border: 1px solid #e5e7eb;
      border-radius: 30px; font-size: 1rem; transition: border-color 0.2s;
    }
    .search-bar input:focus { outline: none; border-color: #ec4899; box-shadow: 0 0 0 4px rgba(236,72,153,0.1); }
    .search-icon { position: absolute; right: 20px; top: 50%; transform: translateY(-50%); color: #9ca3af; }

    .filter-chips { display: flex; gap: 0.5rem; flex-wrap: wrap; }
    .filter-chips button {
      padding: 8px 18px; border-radius: 20px; border: 1px solid #e5e7eb;
      background: white; cursor: pointer; font-size: 0.9rem; transition: all 0.2s;
    }
    .filter-chips button:hover { background: #fdf2f8; border-color: #fce7f3; }
    .filter-chips button.active { background: #ec4899; color: white; border-color: #ec4899; }

    .results-info {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 2rem; color: #4b5563; font-size: 0.9rem;
    }
    .sort-select { display: flex; align-items: center; gap: 0.8rem; }
    .sort-select select {
      padding: 6px 12px; border-radius: 8px; border: 1px solid #e5e7eb;
      color: #374151; font-weight: 500;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2.5rem;
    }

    .no-results { padding: 80px 0; text-align: center; }
    .no-results-content span { font-size: 4rem; display: block; margin-bottom: 1rem; }
    .no-results-content h3 { font-size: 1.5rem; margin-bottom: 0.5rem; color: #1f2937; }
    .no-results-content p { color: #6b7280; margin-bottom: 1.5rem; }
    .no-results-content button {
      background: #fdf2f8; color: #ec4899; border: 1px solid #fce7f3;
      padding: 10px 25px; border-radius: 30px; cursor: pointer; font-weight: 600;
    }

    @media (max-width: 640px) {
      .controls { flex-direction: column; align-items: stretch; gap: 1rem; }
      .search-bar { min-width: auto; }
      .results-info { flex-direction: column; gap: 1rem; align-items: flex-start; }
    }
  `]
})
export class ProductListComponent implements OnInit {
  productService = inject(ProductService);
  
  products: Product[] = [];
  categories: string[] = ['All', 'Serums', 'Moisturizers', 'Cleansers', 'Masks'];
  
  searchQuery: string = '';
  selectedCategory: string = 'All';
  sortBy: string = 'name';

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  get filteredProducts() {
    let filtered = [...this.products];

    // Category Filter
    if (this.selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }

    // Search Filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      if (this.sortBy === 'priceLow') return a.price - b.price;
      if (this.sortBy === 'priceHigh') return b.price - a.price;
      if (this.sortBy === 'rating') return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });

    return filtered;
  }

  onAddToCart(product: Product) {
    this.productService.addToCart(product);
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedCategory = 'All';
    this.sortBy = 'name';
  }
}
