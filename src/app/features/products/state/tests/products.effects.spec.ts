import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { APIService } from '../../../../api/api.service';
import { createProduct } from '../../__mocks__/mock.data';
import { Product } from '../../models/product.model';
import { ProductsAPIActions, ProductsPageActions } from '../products.actions';
import { ProductEffects } from '../products.effects';

describe('ProductsEffects', () => {
  let effects: ProductEffects;
  let action$: Observable<Action>;
  let apiSvc: jasmine.SpyObj<APIService>;
  let router: jasmine.SpyObj<Router>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    const apiServiceSpy = jasmine.createSpyObj('APIService', [
      'getProducts',
      'getProductById',
      'createProduct',
      'updateProduct',
      'deleteProduct',
    ]);

    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        ProductEffects,
        provideHttpClient(),
        provideMockActions(() => action$),
        { provide: APIService, useValue: apiServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    effects = TestBed.inject(ProductEffects);
    apiSvc = TestBed.inject(APIService) as jasmine.SpyObj<APIService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe('updateProduct$', () => {
    it('should return a productUpdatedSuccess action, with the product, on success', () => {
      const product: Product = createProduct({
        id: 1,
        title: 'Updated Product',
      });
      const update: Update<Product> = {
        id: 1,
        changes: product,
      };

      const action = ProductsPageActions.updateProduct({ product });
      const outcome = ProductsAPIActions.productUpdatedSuccess({ update });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        action$ = hot('-a', { a: action });
        const response$ = cold<Product>('-b|', { b: product });
        apiSvc.updateProduct.and.returnValue(response$);
        expectObservable(effects.updateProduct$).toBe('--b', { b: outcome });
      });
    });
  });
});
