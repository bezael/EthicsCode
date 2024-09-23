import {
  Component,
  EventEmitter,
  Input,
  input,
  Output,
  output,
} from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input({ required: true, alias: 'product' }) currentProduct!: Product;
  @Output() addToCartEvent = new EventEmitter<Product>();

  onAddToCart(): void {
    this.addToCartEvent.emit(this.currentProduct);
  }
}
