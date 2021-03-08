import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import countriesReducer from './countries/reducer';
import appReducer from './app/reducer';

const store = configureStore({
	reducer: {
		countries: countriesReducer,
		app: appReducer,
	},
	middleware: [thunkMiddleware],
});

export default store;
