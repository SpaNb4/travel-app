import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import countriesReducer from './countries/reducer';

const store = configureStore({
	reducer: {
		countries: countriesReducer,
	},
	middleware: [thunkMiddleware],
});

export default store;
