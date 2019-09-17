import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

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

export function reducer(state: ProductsState = initialState, action): ProductsState {
  switch (action.type) {
    case 'TOGGLE_PRODUCT_CODE':
      return {
        ...state,
        showProductCode: action.payload,
      };
    default:
      return state;
  }
}
