import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';

const initialState = {
	countries: [],
	loading: false,
	searchValue: '',
	errorMessage: '',
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(actions.updateSearchValue, (state, action) => {
			state.searchValue = action.payload.trim();
		})
		.addCase(actions.fetchCountriesSuccess, (state, action) => {
			state.countries = action.payload;
		})
		.addCase(actions.fetchCountriesFailure, (state, action) => {
			state.errorMessage = action.payload;
		})
		.addCase(actions.showLoader, (state) => {
			state.loading = true;
		})
		.addCase(actions.hideLoader, (state) => {
			state.loading = false;
		})
		.addDefaultCase((state) => state);
});

export default reducer;
