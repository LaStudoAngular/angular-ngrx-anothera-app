import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { GenericValidator } from '../../shared/generic-validator';
import { NumberValidators } from '../../shared/number.validator';
import { select, Store } from '@ngrx/store';
import { getCurrentProduct } from '../state/product.reducer';
import * as productReducer from '../state/product.reducer';
import { ClearCurrentProduct, SetCurrentProduct } from '../state/product.actions';

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit, OnDestroy {
  pageTitle = 'Product Edit';
  errorMessage = '';
  productForm: FormGroup;

  product: Product | null;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private store: Store<productReducer.State>,
  ) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      productName: {
        required: 'Product name is required.',
        minlength: 'Product name must be at least three characters.',
        maxlength: 'Product name cannot exceed 50 characters.',
      },
      productCode: {
        required: 'Product code is required.',
      },
      starRating: {
        range: 'Rate the product between 1 (lowest) and 5 (highest).',
      },
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      productCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      description: '',
    });

    // TODO: unsubscribe
    this.store
      .pipe(select(getCurrentProduct))
      .subscribe((product: Product) => this.displayProduct(product));

    this.productForm.valueChanges.subscribe(
      value => (this.displayMessage = this.genericValidator.processMessages(this.productForm)),
    );
  }

  ngOnDestroy(): void {}

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.productForm);
  }

  displayProduct(product: Product | null): void {
    // Set the local product property
    this.product = product;

    if (this.product) {
      // Reset the form back to pristine
      this.productForm.reset();

      // Display the appropriate page title
      if (this.product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }

      // Update the data on the form
      this.productForm.patchValue({
        productName: this.product.productName,
        productCode: this.product.productCode,
        starRating: this.product.starRating,
        description: this.product.description,
      });
    }
  }

  cancelEdit(): void {
    // Redisplay the currently selected product
    // replacing any edits made
    this.displayProduct(this.product);
  }

  deleteProduct(): void {
    if (this.product && this.product.id) {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id).subscribe({
          next: () => this.store.dispatch(new ClearCurrentProduct()),
          error: err => (this.errorMessage = err.error),
        });
      }
    } else {
      // No need to delete, it was never saved
      this.store.dispatch(new ClearCurrentProduct());
    }
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        // Copy over all of the original product properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const p = { ...this.product, ...this.productForm.value };

        if (p.id === 0) {
          this.productService.createProduct(p).subscribe({
            next: product => this.store.dispatch(new SetCurrentProduct(product)),
            error: err => (this.errorMessage = err.error),
          });
        } else {
          this.productService.updateProduct(p).subscribe({
            next: product => this.store.dispatch(new SetCurrentProduct(product)),
            error: err => (this.errorMessage = err.error),
          });
        }
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }
}
