import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import countriesReducer from './countries/reducer';
import countryReducer from './country/reducer';
import appReducer from './app/reducer';
import { SLICE_NAME as app } from './app/action-types';
import { SLICE_NAME as countries } from './countries/action-types';
import { SLICE_NAME as country } from './country/action-types';

const store = configureStore({
	reducer: {
		[countries]: countriesReducer,
		[app]: appReducer,
		[country]: countryReducer,
	},
	middleware: [thunkMiddleware],
});

export default store;
