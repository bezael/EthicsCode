import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from './models/product.model';
import { ProductCardComponent } from './product-card/product-card.component';
import {
  selectProducts,
  selectProductsError,
  selectProductsLoading,
} from './state/products.selectors';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  standalone: true,
  imports: [ProductsComponent, ProductCardComponent, AsyncPipe],
})
export class ProductsComponent {
  private readonly _store = inject(Store);

  products$ = this._store.selectSignal(selectProducts);
  errorMessage$ = this._store.select(selectProductsError);
  loading$ = this._store.select(selectProductsLoading);

  addToCart(product: Product): void {
    console.log('Add product to cart', product);
  }
}
