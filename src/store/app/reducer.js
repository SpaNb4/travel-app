import { createReducer } from '@reduxjs/toolkit';
import { updateCurrLng } from './actions';
import { DEFAULT_LANGUAGE } from '../../common/constants';

const initialState = {
	currLng: DEFAULT_LANGUAGE,
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(updateCurrLng, (state, action) => {
			state.currLng = action.payload;
		})
		.addDefaultCase((state) => state);
});

export default reducer;
