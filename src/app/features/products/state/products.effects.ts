import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  Observable,
  of,
  tap,
} from 'rxjs';
import { APIService } from '../../../api/api.service';
import { Product } from '../models/product.model';
import { ProductsAPIActions, ProductsPageActions } from './products.actions';

@Injectable()
export class ProductEffects {
  loadProducts$: Observable<Action>;
  addProduct$: Observable<Action>;
  updateProduct$: Observable<Action>;
  deleteProduct$: Observable<Action>;

  private readonly _apiSvc = inject(APIService);
  private readonly _actions$ = inject(Actions);
  private readonly _router = inject(Router);

  ngrxOnInitEffects(): Action {
    return ProductsPageActions.loadProducts();
  }

  constructor() {
    this.loadProducts$ = this._loadProducts();
    this.updateProduct$ = this._updateProduct();
    this.deleteProduct$ = this._deleteProduct();
    this.addProduct$ = this._addProduct();
  }

  redirectToProductsPage$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          ProductsAPIActions.productAddedSuccess,
          ProductsAPIActions.productUpdatedSuccess,
          ProductsAPIActions.productDeletedSuccess,
        ),
        tap(() => this._router.navigate(['/products'])),
      ),
    { dispatch: false },
  );

  private _updateProduct() {
    return createEffect(() =>
      this._actions$.pipe(
        ofType(ProductsPageActions.updateProduct),
        concatMap(({ product }) =>
          this._apiSvc.updateProduct(product.id, product).pipe(
            map((updatedProduct: Product) =>
              ProductsAPIActions.productUpdatedSuccess({
                update: { id: product.id, changes: product },
              }),
            ),
            catchError((error) =>
              of(
                ProductsAPIActions.productUpdatedFailure({
                  errorMessage: error.message,
                }),
              ),
            ),
          ),
        ),
      ),
    );
  }

  private _deleteProduct() {
    return createEffect(() =>
      this._actions$.pipe(
        ofType(ProductsPageActions.deleteProduct),
        mergeMap(({ productId }) => {
          return this._apiSvc.deleteProduct(productId).pipe(
            map(() => ProductsAPIActions.productDeletedSuccess({ productId })),
            catchError((error) =>
              of(
                ProductsAPIActions.productDeletedFailure({
                  errorMessage: error.message,
                }),
              ),
            ),
          );
        }),
      ),
    );
  }
  private _addProduct() {
    return createEffect(() =>
      this._actions$.pipe(
        ofType(ProductsPageActions.addProduct),
        concatMap(({ product }) =>
          this._apiSvc.createProduct(product).pipe(
            map((product: Product) =>
              ProductsAPIActions.productAddedSuccess({ product }),
            ),
            catchError((error) =>
              of(
                ProductsAPIActions.productAddedFailure({
                  errorMessage: error.message,
                }),
              ),
            ),
          ),
        ),
      ),
    );
  }

  private _loadProducts() {
    return createEffect(() =>
      this._actions$.pipe(
        ofType(ProductsPageActions.loadProducts),
        exhaustMap(() =>
          this._apiSvc.getProducts().pipe(
            map((products: Product[]) =>
              ProductsAPIActions.productsLoadedSuccess({ products }),
            ),
            catchError((error) =>
              of(
                ProductsAPIActions.productsLoadedFailure({
                  errorMessage: error.message,
                }),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
