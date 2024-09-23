import { getRouterSelectors } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from '../models/product.model';
import * as fromProducts from './products.reducers';

export const selectProductsState =
  createFeatureSelector<ProductsState>('products');

export const selectProducts = createSelector(
  selectProductsState,
  fromProducts.selectProducts,
);

export const selectProductsEntities = createSelector(
  selectProductsState,
  fromProducts.selectProductsEntities,
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  ({ loading }) => loading,
);

export const selectProductsError = createSelector(
  selectProductsState,
  ({ errorMessage }) => errorMessage,
);
export const { selectRouteParams } = getRouterSelectors();

export const selectProductById = createSelector(
  selectProductsEntities,
  selectRouteParams,
  (productEntities, { productId }) => productEntities[productId],
);
