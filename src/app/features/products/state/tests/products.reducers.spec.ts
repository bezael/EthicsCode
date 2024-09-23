import { createProducts } from '../../__mocks__/mock.data';
import { Product } from '../../models/product.model';
import { ProductsAPIActions, ProductsPageActions } from '../products.actions';
import { initialState, productsReducer } from '../products.reducers';

describe('ProductReducer', () => {
  describe('initialState', () => {
    it('return the default state', () => {
      const action = { type: 'NOOP' };
      const state = productsReducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });

  describe('Load Products', () => {
    it('set loading to true ', () => {
      const action = ProductsPageActions.loadProducts();
      const state = productsReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.errorMessage).toBeNull();
    });

    it('add products on success', () => {
      const products: Product[] = createProducts(
        {
          id: 1,
          title: 'Product 1',
          price: '$10.55',
        },
        {
          id: 2,
          title: 'Product 2',
          price: '$55.55',
        },
        {
          id: 3,
          title: 'Product 3',
          price: '$15.05',
        },
      );
      const action = ProductsAPIActions.productsLoadedSuccess({ products });

      const state = productsReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.ids.length).toBe(3);
      expect(state.entities[1]).toEqual(products[0]);
    });

    it('set error on failure', () => {
      const message = 'Error loading products';
      const action = ProductsAPIActions.productsLoadedFailure({
        errorMessage: message,
      });
      const { loading, errorMessage } = productsReducer(initialState, action);

      expect(loading).toBe(false);
      expect(errorMessage).toBe(message);
    });
  });
});
