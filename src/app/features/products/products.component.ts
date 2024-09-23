import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from '../../api/api.service';
import { Product } from './models/product.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products$!: Observable<Product[]>;

  private readonly _apiSvc = inject(APIService); // spy
  private readonly _store = inject(Store);

  ngOnInit(): void {
    this.products$ = this._apiSvc.getProducts(); // toHaveBeenCalled
    this._store.subscribe((state) => console.log(state));
  }

  //TODO: Add unit test
  addToCart(product: Product): void {
    console.log('Add product to cart', product);
  }
}
