import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import store from './reduxs/store';
export default createStore(store, applyMiddleware(thunk));
