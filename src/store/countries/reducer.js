import * as t from './action-types';

const initialState = {
	countries: [],
	loading: false,
	searchValue: '',
}

const handlers = {
	[t.FETCH_COUNTRIES_SUCCESS]: (state, { payload: { countries } }) => ({
		...state,
		countries: countries,
	}),
	[t.UPDATE_SEARCH_VALUE]: (state, { payload: { value } }) => ({
		...state,
		searchValue: value,
	}),
	DEFAULT: (state) => state,
};

const reducer = ( state = initialState, action ) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default reducer;
