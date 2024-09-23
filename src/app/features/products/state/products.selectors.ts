import { createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducers';

export const selectProductsState = (state: { products: any }) => state.products;

export const selectAllProducts = createSelector(
  selectProductsState,
  (state: ProductsState) => state.products
);
