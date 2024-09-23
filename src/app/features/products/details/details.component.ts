import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectProductById } from '../state/products.selectors';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  // @Input() productId!: number;
  // productId = input.required<number>();
  private readonly _store = inject(Store);
  product$ = this._store.selectSignal(selectProductById);
}
