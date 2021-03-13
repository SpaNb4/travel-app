import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';

const initialState = {
	loading: false,
	currentId: '',
	currentCountry: null,
	errorMessage: '',
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(actions.fetchCountrySuccess, (state, action) => {
			state.currentCountry = action.payload;
		})
		.addCase(actions.fetchCountryFailure, (state, action) => {
			state.errorMessage = action.payload;
		})
		.addCase(actions.showLoader, (state) => {
			state.loading = true;
		})
		.addCase(actions.hideLoader, (state) => {
			state.loading = false;
		})
		.addCase(actions.getCountryId, (state, action) => {
			state.currentId = action.payload;
		})
		.addDefaultCase((state) => state);
});

export default reducer;
