import { Component } from '@angular/core';
import { ProductsComponent } from './products/products';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductsComponent],
  template: `<app-products></app-products>`,
  styleUrl: './app.css'
})
export class App {}
