import { Product } from '../product';
import * as fromRoot from '../../state/app.state';

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
