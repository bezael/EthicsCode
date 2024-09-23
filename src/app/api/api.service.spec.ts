import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  createProduct,
  createProducts,
} from '../features/products/__mocks__/mock.data';
import { Product } from '../features/products/models/product.model';
import { APIService } from './api.service';

describe('APIService', () => {
  let apiService: APIService;
  let httpMock: HttpTestingController;
  const baseUrl = 'https://fakestoreapi.com/products';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    apiService = TestBed.inject(APIService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get all products ', () => {
    const dummyProducts: Product[] = createProducts(
      {
        id: 1,
        title: 'Silicon Power 256GB SSD',
        price: '$10.55',
      },
      {
        id: 2,
        title: 'SanDisk SSD PLUS 1TB',
        price: '$55.55',
      }
    );
    apiService.getProducts().subscribe((products: Product[]) => {
      expect(products.length).toBe(2);
      expect(products).toEqual(dummyProducts);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts);
  });

  it('should get a product by id ', () => {
    const dummyProduct: Product = createProduct({
      id: 10,
      description: 'Easy ',
      category: 'electronics',
    });
    const productId = 100;

    apiService.getProductById(productId).subscribe((product: Product) => {
      expect(product).toEqual(dummyProduct);
    });

    const req = httpMock.expectOne(`${baseUrl}/${productId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProduct);
  });

  it('should create a product ', () => {
    const newProduct: Product = createProduct({
      id: 17,
      title: 'Mock product',
      image: 'https://mockapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
    });

    apiService.createProduct(newProduct).subscribe((product: Product) => {
      expect(product).toEqual(newProduct);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newProduct);
  });

  it('should update a product ', () => {
    const newProduct: Product = createProduct({
      id: 17,
      title: 'Mock update product',
      price: '19',
      description: 'Hard',
    });
    const productId = 17;

    apiService
      .updateProduct(productId, newProduct)
      .subscribe((product: Product) => {
        expect(product).toEqual(newProduct);
      });

    const req = httpMock.expectOne(`${baseUrl}/${productId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(newProduct);
  });

  it('should delete a product', () => {
    const productId = 55;
    apiService.deleteProduct(productId).subscribe((response: any) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${baseUrl}/${productId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
