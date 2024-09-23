import { ProductsState } from '../../models/product.model';
import * as fromSelectors from '../products.selectors';

describe('Products Selectors', () => {
  const initialState: ProductsState = {
    ids: [1, 2],
    entities: {
      1: {
        id: 1,
        title: 'Product 1',
        price: '10',
        category: 'Category 1',
        description: 'Description 1',
        image: 'image1.jpg',
      },
      2: {
        id: 2,
        title: 'Product 2',
        price: '20',
        category: 'Category 2',
        description: 'Description 2',
        image: 'image2.jpg',
      },
    },
    loading: false,
    errorMessage: null,
  };
  it('select the products feature state', () => {
    const result = fromSelectors.selectProductsState.projector(initialState);
    expect(result).toBe(initialState);
  });

  it('select all products', () => {
    const result = fromSelectors.selectProducts.projector(initialState);
    const expected = [
      {
        id: 1,
        title: 'Product 1',
        price: '10',
        category: 'Category 1',
        description: 'Description 1',
        image: 'image1.jpg',
      },
      {
        id: 2,
        title: 'Product 2',
        price: '20',
        category: 'Category 2',
        description: 'Description 2',
        image: 'image2.jpg',
      },
    ];
    expect(result).toEqual(expected);
  });

  it('select product loading state', () => {
    const result = fromSelectors.selectProductsLoading.projector(initialState);
    expect(result).toBeFalse();
  });
});
