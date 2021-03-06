import { createStore, compose, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import countriesReducer from './countries/reducer';
import reducer2 from './something2/reducer2';

const rootReducer = combineReducers({ countriesReducer, reducer2 });

const composeEnhancers =
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

const enhancer = composeEnhancers(applyMiddleware());

const store = createStore(rootReducer, enhancer);

export default store;
