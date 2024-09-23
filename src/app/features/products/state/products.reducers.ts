import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Product, ProductsState } from '../models/product.model';
import { ProductsAPIActions, ProductsPageActions } from './products.actions';

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({});

export const initialState: ProductsState = adapter.getInitialState({
  loading: false,
  errorMessage: null,
});

export const productsReducer = createReducer(
  initialState,
  on(ProductsPageActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    errorMessage: null,
  })),
  on(ProductsAPIActions.productsLoadedSuccess, (state, { products }) =>
    adapter.addMany(products, {
      ...state,
      loading: false,
    })
  ),
  on(ProductsAPIActions.productsLoadedFailure, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    errorMessage: errorMessage,
  })),

  // Create
  on(ProductsPageActions.addProduct, (state, { product }) => ({
    ...state,
    loading: true,
    errorMessage: null,
  })),
  on(ProductsAPIActions.productAddedSuccess, (state, { product }) =>
    adapter.addOne(product, {
      ...state,
      loading: false,
      errorMessage: null,
    })
  ),
  on(ProductsAPIActions.productAddedFailure, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    errorMessage,
  })),

  // Update
  on(ProductsPageActions.updateProduct, (state, { product }) => ({
    ...state,
    loading: true,
    errorMessage: null,
  })),
  on(ProductsAPIActions.productUpdatedSuccess, (state, { update }) =>
    adapter.updateOne(update, {
      ...state,
      loading: false,
      errorMessage: null,
    })
  ),
  on(ProductsAPIActions.productUpdatedFailure, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    errorMessage,
  })),

  // Delete
  on(ProductsPageActions.deleteProduct, (state, { productId }) => ({
    ...state,
    loading: true,
    errorMessage: null,
  })),
  on(ProductsAPIActions.productDeletedSuccess, (state, { productId }) =>
    adapter.removeOne(productId, {
      ...state,
      loading: false,
      errorMessage: null,
    })
  ),
  on(ProductsAPIActions.productDeletedFailure, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    errorMessage,
  }))
);

export const { selectAll, selectEntities } = adapter.getSelectors();

export const selectProducts = selectAll;
export const selectProductsEntities = selectEntities;
