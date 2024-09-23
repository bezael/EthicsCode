import { AsyncPipe } from '@angular/common';
import {
  Component,
  computed,
  inject,
  Injector,
  OnInit,
  runInInjectionContext,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
export class ProductsComponent implements OnInit {
  private readonly _store = inject(Store);
  private readonly _injector = inject(Injector);
  private _productsSignal!: Signal<Product[]>;

  products$ = computed(() => this._productsSignal());
  errorMessage$ = this._store.select(selectProductsError);
  loading$ = this._store.select(selectProductsLoading);

  ngOnInit(): void {
    runInInjectionContext(this._injector, () => {
      this._productsSignal = toSignal(
        this._store.select(selectProducts)
      ) as unknown as Signal<Product[]>;
    });
  }

  addToCart(product: Product): void {
    console.log('Add product to cart', product);
  }
}
