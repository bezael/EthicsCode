import { createProduct, createProducts } from '../../__mocks__/mock.data';
import { Product } from '../../models/product.model';
import { ProductsAPIActions, ProductsPageActions } from '../products.actions';

describe('Products Actions', () => {
  describe('Products PageActions', () => {
    it('create a loadProducts action', () => {
      const action = ProductsPageActions.loadProducts();
      expect(action.type).toBe('[Products Page] Load Products');
    });

    it('create an addProduct action', () => {
      const product: Product = createProduct({
        id: 1,
        title: 'New Product',
      });
      const action = ProductsPageActions.addProduct({ product });
      expect(action.type).toBe('[Products Page] Add Product');
      expect(action.product).toEqual(product);
    });

    it('create an updateProduct action', () => {
      const product: Product = createProduct({
        id: 18,
        title: 'Updated Product',
        price: '$20.12',
      });

      const action = ProductsPageActions.updateProduct({ product });
      expect(action.type).toBe('[Products Page] Update Product');
      expect(action.product).toEqual(product);
    });

    it('create a deleteProduct action', () => {
      const productId = 5;
      const action = ProductsPageActions.deleteProduct({ productId });
      expect(action.type).toBe('[Products Page] Delete Product');
      expect(action.productId).toEqual(productId);
    });
  });

  describe('ProductsAPIActions', () => {
    it('create a ProductsLoadedSuccess action ', () => {
      const products: Product[] = createProducts(
        {
          id: 1,
          title: 'New Product',
        },
        {
          id: 2,
          title: 'New Product 2',
        }
      );
      const action = ProductsAPIActions.productsLoadedSuccess({ products });
      expect(action.type).toBe('[Products API] Products Loaded Success');
      expect(action.products).toEqual(products);
    });

    it('create a ProductsLoadedFailure action ', () => {
      const errorMessage = 'Error loading products';
      const action = ProductsAPIActions.productsLoadedFailure({ errorMessage });

      expect(action.type).toBe('[Products API] Products Loaded Failure');
      expect(action.errorMessage).toEqual(errorMessage);
    });

    it('create a ProductsAddedSuccess action ', () => {
      const product: Product = createProduct({
        id: 1,
        title: 'New Product',
        price: '$15.54',
      });

      const action = ProductsAPIActions.productAddedSuccess({ product });
      expect(action.type).toBe('[Products API] Product Added Success');
      expect(action.product).toEqual(product);
    });

    it('create a ProductsAddedFailure action ', () => {
      const errorMessage = 'Error adding product';
      const action = ProductsAPIActions.productAddedFailure({ errorMessage });

      expect(action.type).toBe('[Products API] Product Added Failure');
      expect(action.errorMessage).toEqual(errorMessage);
    });
  });
});
