import { Component, OnInit, OnDestroy } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { select, Store } from '@ngrx/store';
import * as productReducer from '../state/product.reducer';
import {
  InitializeCurrentProduct,
  SetCurrentProduct,
  ToggleProductCode,
} from '../state/product.actions';
import { getCurrentProduct } from '../state/product.reducer';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;
  displayCode: boolean;
  products: Product[];
  selectedProduct: Product | null;

  constructor(private productService: ProductService, private store: Store<productReducer.State>) {}

  ngOnInit(): void {
    // TODO: unsubscribe
    this.store
      .pipe(select(getCurrentProduct))
      .subscribe((product: Product) => (this.selectedProduct = product));

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => (this.products = products),
      error: (err: any) => (this.errorMessage = err.error),
    });

    // TODO: unsubscribe
    this.store
      .pipe(select(productReducer.getShowProductCode))
      .subscribe((showProductCode: boolean) => (this.displayCode = showProductCode));
  }

  ngOnDestroy(): void {}

  checkChanged(value: boolean): void {
    this.store.dispatch(new ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new SetCurrentProduct(product));
  }
}
