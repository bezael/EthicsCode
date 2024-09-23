import { Component, inject, input, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from '../../../api/api.service';
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  // @Input() productId!: number;
  productId = input.required<number>();
  product$!: Observable<Product>;
  private readonly _productSvc = inject(APIService);

  ngOnInit(): void {
    this.product$ = this._productSvc.getProductById(this.productId());
  }
}
