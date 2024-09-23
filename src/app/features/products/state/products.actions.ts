import { Update } from '@ngrx/entity';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../models/product.model';

export const ProductsPageActions = createActionGroup({
  source: 'Products Page',
  events: {
    'Load Products': emptyProps(),
    'Add Product': props<{ product: Product }>(),
    'Update Product': props<{ product: Product }>(),
    'Delete Product': props<{ productId: number }>(),
  },
});

export const ProductsAPIActions = createActionGroup({
  source: 'Products API',
  events: {
    'Products Loaded Success': props<{ products: Product[] }>(),
    'Products Loaded Failure': props<{ errorMessage: string }>(),
    'Product Added Success': props<{ product: Product }>(),
    'Product Added Failure': props<{ errorMessage: string }>(),
    'Product Updated Success': props<{ update: Update<Product> }>(),
    'Product Updated Failure': props<{ errorMessage: string }>(),
    'Product Deleted Success': props<{ productId: number }>(),
    'Product Deleted Failure': props<{ errorMessage: string }>(),
  },
});
