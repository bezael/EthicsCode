import { createReducer, on } from '@ngrx/store';
import { Product } from '../models/product.model';
import {
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
} from './products.actions';

export interface ProductsState {
  products: Product[];
  loading: boolean;
  errorMessage: any;
}

export const initialState: ProductsState = {
  products: [],
  loading: false,
  errorMessage: null,
};

export const productsReducer = createReducer(
  initialState,
  on(loadProducts, (state) => ({ ...state, loading: true })),
  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    errorMessage: null,
    products,
  })),
  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    errorMessage: error,
  }))
);
