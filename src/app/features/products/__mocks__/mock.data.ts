import { Product } from '../models/product.model';

let nextId = 1;
export const createProduct = (overrides: Partial<Product> = {}): Product => ({
  id: nextId++,
  title: 'ScanDisk SSD PLUS 1TB',
  price: '.98',
  category: 'Fashion',
  description: 'Easy upgrade for faster boot up',
  image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
  ...overrides,
});

export const createProducts = (...overrides: Partial<Product>[]) =>
  overrides.map(createProduct);

export const resetProductId = () => (nextId = 1);
