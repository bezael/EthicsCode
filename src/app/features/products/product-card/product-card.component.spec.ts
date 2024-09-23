import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Component, output, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { createProduct } from '../__mocks__/mock.data';
import { Product } from '../models/product.model';
import { ProductCardComponent } from './product-card.component';

registerLocaleData(localeEs, 'es');
describe('productCardComponent', () => {
  @Component({
    standalone: true,
    imports: [ProductCardComponent],
    template: `<app-product-card [product]="currentProduct()" />`,
  })
  class ProductCardWrapperComponent {
    currentProduct = signal(
      createProduct({ title: 'Initial product', price: '545' })
    );
    // currentProduct = createProduct({ title: 'Initial product', price: 545 });
    addToCartEvent = output<Product>();

    onAddToCart(): void {
      this.addToCartEvent.emit(this.currentProduct());
    }
  }

  it('set current product to input', () => {
    const fixture = TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ProductCardComponent,
        ProductCardWrapperComponent,
      ],
    }).createComponent(ProductCardWrapperComponent);

    const { componentInstance } = fixture;
    fixture.detectChanges();

    const productTitle = fixture.debugElement.query(
      By.css('[data-testid="product-title-link"]')
    ).nativeElement;

    expect(productTitle.textContent).toContain('Initial product');
    componentInstance.currentProduct.set(createProduct({ title: 'Product 2' }));
    // componentInstance.currentProduct = createProduct({ title: 'Product 2' });
    fixture.detectChanges();

    expect(productTitle.textContent).toContain('Product 2');
  });

  it('emit addToCartEvent with the current product when onAddToCart is called', () => {
    const fixture = TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ProductCardComponent,
        ProductCardWrapperComponent,
      ],
    }).createComponent(ProductCardWrapperComponent);

    const { componentInstance } = fixture;
    fixture.detectChanges();

    spyOn(componentInstance.addToCartEvent, 'emit');
    componentInstance.onAddToCart();

    expect(componentInstance.addToCartEvent.emit).toHaveBeenCalledWith(
      componentInstance.currentProduct()
    );
  });
});
