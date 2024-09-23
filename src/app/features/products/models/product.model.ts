import { EntityState } from '@ngrx/entity';

export interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export interface ProductsState extends EntityState<Product> {
  loading: boolean;
  errorMessage: string | null;
}
