import * as types from './action-types';
import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { extendWithIds } from '../../common/helpers';
import { COUNTRIES_URL } from '../../common/constants';

export const updateSearchValue = createAction(types.UPDATE_SEARCH_VALUE);
export const fetchCountriesSuccess = createAction(types.FETCH_COUNTRIES_SUCCESS);
export const fetchCountriesFailure = createAction(types.FETCH_COUNTRIES_FAILURE);
export const showLoader = createAction(types.SHOW_LOADER);
export const hideLoader = createAction(types.HIDE_LOADER);
export const getCountryId = createAction(types.GET_COUNTRY_ID);

export const fetchCountries = () => async (dispatch) => {
	try {
		dispatch(showLoader());
		const response = await axios(COUNTRIES_URL);
		const countriesWithIds = Object.values(extendWithIds(response.data));
		dispatch(fetchCountriesSuccess(countriesWithIds));
		dispatch(hideLoader());
	} catch (error) {
		dispatch(fetchCountriesFailure(error));
	}
};
