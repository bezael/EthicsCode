import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { APIService } from '../../api/api.service';
import { createProduct, createProducts } from './__mocks__/mock.data';
import { Product } from './models/product.model';
import { ProductsComponent } from './products.component';

@Component({
  selector: 'app-product-card',
  template: ` <div data-testid="mock-product-card" class="product-container">
    {{ currentProduct.title }}
  </div>`,
})
class MockProductCardComponent {
  @Input({ required: true, alias: 'product' }) currentProduct!: Product;
  @Output() addToCartEvent = new EventEmitter<Product>();
}

describe('ProductsComponent', () => {
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
      declarations: [ProductsComponent, MockProductCardComponent],
      imports: [],
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

  it('should initialize products$ in ngOnInit', () => {
    apiServiceSpy.getProducts.and.returnValues(of(dummyProducts));

    productsComponent.ngOnInit();

    expect(apiServiceSpy.getProducts).toHaveBeenCalled();

    productsComponent.products$.subscribe((products: Product[]) => {
      expect(products).toEqual(dummyProducts);
      expect(products.length).toBe(2);
    });
  });

  it('trackFn should return product id', () => {
    const dummyProduct: Product = createProduct({
      id: 11,
      title: 'Silicon Power 256GB SSD 3D NAND',
      price: '109',
      category: 'electronics',
    });
    expect(productsComponent.trackFn(0, dummyProduct)).toBe(11);
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
