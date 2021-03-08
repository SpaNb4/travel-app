import * as t from './action-types';

const initialState = {
	countries: [],
	loading: false,
	searchValue: '',
};

const handlers = {
	[t.FETCH_COUNTRIES_SUCCESS]: (state, { payload }) => ({
		...state,
		countries: payload,
	}),
	[t.UPDATE_SEARCH_VALUE]: (state, { payload: { value } }) => ({
		...state,
		searchValue: value,
	}),
	[t.FETCH_COUNTRIES_FAILURE]: (state, { payload }) => ({
		...state,
		errorMessage: payload,
	}),
	[t.SHOW_LOADER]: (state) => ({
		...state,
		loading: true,
	}),
	[t.HIDE_LOADER]: (state) => ({
		...state,
		loading: false,
	}),
	DEFAULT: (state) => state,
};

const reducer = (state = initialState, action) => {
	const handle = handlers[action.type] || handlers.DEFAULT;
	return handle(state, action);
};

export default reducer;
