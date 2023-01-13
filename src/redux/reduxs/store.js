import {combineReducers} from 'redux';
import {cartData} from './cart';
import user from './user';
export default combineReducers({
  cartData,
  user,
});
