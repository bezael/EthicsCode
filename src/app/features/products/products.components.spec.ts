import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { APIService } from '../../api/api.service';
import { createProducts } from './__mocks__/mock.data';
import { Product } from './models/product.model';
import { ProductsComponent } from './products.component';
import { productsReducer } from './state/products.reducers';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  template: ` <div data-testid="mock-product-card" class="product-container">
    {{ currentProduct.title }}
  </div>`,
})
class MockProductCardComponent {
  @Input({ required: true, alias: 'product' }) currentProduct!: Product;
  // @Output() addToCartEvent = new EventEmitter<Product>();
}

fdescribe('ProductsComponent', () => {
  let productsComponent: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let apiServiceSpy: jasmine.SpyObj<APIService>;

  const dummyProducts: Product[] = createProducts(
    {
      id: 10,
      title: 'SanDisk SSD PLUS 1TB Internal SSD',
      description: 'Easy upgrade for faster boot.',
      category: 'electronics',
    },
    {
      id: 11,
      title: 'Silicon Power 256GB SSD 3D NAND',
      price: '109',
    }
  );

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('APIService', ['getProducts']);
    await TestBed.configureTestingModule({
      imports: [
        ProductsComponent,
        MockProductCardComponent,
        StoreModule.forRoot({ products: productsReducer }),
      ],
      providers: [
        {
          provide: APIService,
          useValue: spy,
        },
      ],
    }).compileComponents();

    apiServiceSpy = TestBed.inject(APIService) as jasmine.SpyObj<APIService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    productsComponent = fixture.componentInstance;
  });

  it('should handler empty product list', () => {
    apiServiceSpy.getProducts.and.returnValue(of([]));
    fixture.detectChanges();

    const productCards = fixture.debugElement.queryAll(
      By.css('[data-testid="mock-product-card"]')
    );

    expect(productCards.length).toBe(0);
  });

  it('should render product cards for each product ', () => {
    apiServiceSpy.getProducts.and.returnValues(of(dummyProducts));
    fixture.detectChanges();

    const productCards = fixture.debugElement.queryAll(
      By.css('[data-testid="mock-product-card"]')
    );

    expect(productCards.length).toBe(dummyProducts.length);
  });
});
