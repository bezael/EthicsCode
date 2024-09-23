import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component, inject } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { productsReducer } from '../state/products.reducers';
import DetailsComponent from './details.component';

describe('DetailsComponent()', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let mockStore: any;

  @Component({
    template: `<app-details />`,
    standalone: true,
    imports: [DetailsComponent],
  })
  class TestHostComponent {
    private readonly _store = inject(Store);
    // product$ = this._store.selectSignal(selectProductById);
  }

  beforeEach(async () => {
    mockStore = {
      selectSignal: jasmine
        .createSpy()
        .and.returnValue(of({ id: 1, name: 'Product A' })),
    };

    TestBed.configureTestingModule({
      imports: [
        TestHostComponent,
        StoreModule.forRoot({ products: productsReducer }),
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: Store,
          useValue: mockStore,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the DetailsComponent', () => {
    expect(component).toBeTruthy();
  });

  // it('should call ngOnInit and fetch product details', () => {
  //   const detailsComponent = fixture.debugElement.children[0].componentInstance;
  //   // component.productId = 1;
  //   fixture.detectChanges();
  //   // spyOn(detailsComponent, 'ngOnInit').and.callThrough();
  //   // detailsComponent.ngOnInit();
  //   // expect(detailsComponent.ngOnInit).toHaveBeenCalled();
  //   expect(detailsComponent.product$).toBeDefined();
  // });

  // it('should select product from store', () => {
  //   component.product$.subscribe((product) => {
  //     expect(product).toEqual({ id: 1, name: 'Product A' });
  //   });
  // });

  // it('should display product details in the template', () => {
  //   const detailsComponent = fixture.debugElement.children[0].componentInstance;
  //   detailsComponent.productId = 1;
  //   detailsComponent.ngOnInit();
  //   fixture.detectChanges();

  //   detailsComponent.product$.subscribe((product: Product) => {
  //     fixture.detectChanges();
  //     const compiled = fixture.nativeElement;
  //     expect(compiled.querySelector('.product-title').textContent).toContain(
  //       product.title
  //     );
  //     expect(compiled.querySelector('.product-category').textContent).toContain(
  //       product.category
  //     );
  //     expect(
  //       compiled.querySelector('.product-description').textContent
  //     ).toContain(product.description);
  //     expect(compiled.querySelector('.product-price').textContent).toContain(
  //       product.price
  //     );
  //   });
  // });
});
