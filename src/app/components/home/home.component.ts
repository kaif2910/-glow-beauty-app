import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, ProductListComponent],
  template: `
    <app-hero></app-hero>
    <app-product-list></app-product-list>
  `
})
export class HomeComponent {}
