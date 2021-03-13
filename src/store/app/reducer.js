import { createReducer } from '@reduxjs/toolkit';
import { updateCurrLng } from './actions';

const initialState = {
	currLng: '',
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(updateCurrLng, (state, action) => {
			state.currLng = action.payload;
		})
		.addDefaultCase((state) => state);
});

export default reducer;
