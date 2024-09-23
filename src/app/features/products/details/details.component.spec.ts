import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from '../models/product.model';
import { DetailsComponent } from './details.component';

describe('DetailsComponent()', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  @Component({
    template: `<app-details />`,
    standalone: true,
    imports: [DetailsComponent],
  })
  class TestHostComponent {
    @Input() productId!: number;
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the DetailsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have a productId input', () => {
    component.productId = 1;
    fixture.detectChanges();
    expect(component.productId).toBe(1);
  });

  it('should call ngOnInit and fetch product details', () => {
    const detailsComponent = fixture.debugElement.children[0].componentInstance;
    spyOn(detailsComponent, 'ngOnInit').and.callThrough();
    detailsComponent.productId = 1;
    detailsComponent.ngOnInit();
    expect(detailsComponent.ngOnInit).toHaveBeenCalled();
    expect(detailsComponent.product$).toBeDefined();
  });

  it('should display product details in the template', () => {
    const detailsComponent = fixture.debugElement.children[0].componentInstance;
    detailsComponent.productId = 1;
    detailsComponent.ngOnInit();
    fixture.detectChanges();

    detailsComponent.product$.subscribe((product: Product) => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.product-title').textContent).toContain(
        product.title
      );
      expect(compiled.querySelector('.product-category').textContent).toContain(
        product.category
      );
      expect(
        compiled.querySelector('.product-description').textContent
      ).toContain(product.description);
      expect(compiled.querySelector('.product-price').textContent).toContain(
        product.price
      );
    });
  });
});
