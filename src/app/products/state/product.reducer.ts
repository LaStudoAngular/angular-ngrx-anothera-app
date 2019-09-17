import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProductActionTypes } from './product.actions';

export interface State extends fromRoot.AppState {
  products: ProductsState;
}

export interface ProductsState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

const initialState: ProductsState = {
  showProductCode: true,
  currentProduct: null,
  products: [],
};

// SELECTORS

const getProductFeatureState = createFeatureSelector<ProductsState>('products');
export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode,
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  state => state.currentProduct,
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products,
);

// REDUCER

export function reducer(
  state: ProductsState = initialState,
  action: ProductActions,
): ProductsState {
  switch (action.type) {
    case ProductActionTypes.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload,
      };
    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        currentProduct: { ...action.payload },
      };
    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProduct: null,
      };
    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProduct: {
          id: 0,
          productName: '',
          productCode: '',
          description: '',
          starRating: 0,
        },
      };
    default:
      return state;
  }
}
