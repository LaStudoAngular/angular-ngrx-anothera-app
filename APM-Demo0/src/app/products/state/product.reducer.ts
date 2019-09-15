import { Product } from '../product';

export interface ProductsState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

export function reducer(state: ProductsState, action) {
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
