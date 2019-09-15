import { ProductsState } from '../products/state/product.reducer';
import { UsersState } from '../user/state/user.reducer';

export interface AppState {
  products: ProductsState;
  users: UsersState;
}
