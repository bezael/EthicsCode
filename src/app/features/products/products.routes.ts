import { Routes } from '@angular/router';
import { ProductsComponent } from './products.component';

const productRoutes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: ':productId',
    loadComponent: () => import('./details/details.component'),
  },
];
export default productRoutes;
