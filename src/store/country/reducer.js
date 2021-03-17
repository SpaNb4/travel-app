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
		.addCase(actions.setRateFailure, (state, action) => {
			state.errorMessage = action.payload;
		})
		.addCase(actions.updatePlace, (state, action) => {
			state.currentCountry.places = state.currentCountry.places.map((place) => {
				if (place.imageUrl === action.payload.imageUrl) {
					place.rates = action.payload.rates;
				}
				return place;
			});
		})
		.addDefaultCase((state) => state);
});

export default reducer;
