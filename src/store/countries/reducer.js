import { createReducer } from '@reduxjs/toolkit';
import {
	updateSearchValue,
	fetchCountriesSuccess,
	fetchCountriesFailure,
	showLoader,
	hideLoader,
	filterCountries,
} from './actions';

const initialState = {
	countries: [],
	loading: false,
	searchValue: '',
	errorMessage: '',
	filteredCountries: [],
};

import { getCurrLng } from '../app/slices';

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(updateSearchValue, (state, action) => {
			state.searchValue = action.payload;
		})
		.addCase(fetchCountriesSuccess, (state, action) => {
			state.countries = action.payload;
		})
		.addCase(fetchCountriesFailure, (state, action) => {
			state.errorMessage = action.payload;
		})
		.addCase(showLoader, (state) => {
			state.loading = true;
		})
		.addCase(hideLoader, (state) => {
			state.loading = false;
		})
		.addCase(filterCountries, (state, action) => {
			state.filteredCountries = state.countries.filter(
				(country) =>
					country.countryName[getCurrLng(state)].toLowerCase().includes(action.payload.toLowerCase()) ||
					country.capitalName[getCurrLng(state)].toLowerCase().includes(action.payload.toLowerCase())
			);
		})
		.addDefaultCase((state) => state);
});

export default reducer;
