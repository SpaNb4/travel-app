import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';

const initialState = {
	currLng: '',
	username: null,
	errorMessage: null,
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(actions.updateCurrLng, (state, action) => {
			state.currLng = action.payload;
		})
		.addCase(actions.registerSuccess, (state, action) => {
			state.username = action.payload;
		})
		.addCase(actions.loginSuccess, (state, action) => {
			state.username = action.payload;
		})
		.addCase(actions.logout, (state) => {
			state.username = null;
		})
		.addDefaultCase((state) => state);
});

export default reducer;
