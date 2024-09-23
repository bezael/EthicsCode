import { createAction } from '@ngrx/store';
import { Product } from '../models/product.model';

export const loadProducts = createAction('[Products] Load Products');
export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  (products: Product[]) => ({ products })
);
export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  (error: any) => ({ error })
);
