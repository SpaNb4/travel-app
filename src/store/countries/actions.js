import * as types from './action-types';
import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ExternalUrls } from '../../common/constants';

export const updateSearchValue = createAction(types.UPDATE_SEARCH_VALUE);
export const fetchCountriesSuccess = createAction(types.FETCH_COUNTRIES_SUCCESS);
export const fetchCountriesFailure = createAction(types.FETCH_COUNTRIES_FAILURE);
export const showLoader = createAction(types.SHOW_LOADER);
export const hideLoader = createAction(types.HIDE_LOADER);

export const fetchCountries = (currLang) => async (dispatch) => {
	try {
		dispatch(showLoader());
		const response = await axios(ExternalUrls.Countries, { params: { lang: currLang } });
		const countries = Object.values(response.data);
		dispatch(fetchCountriesSuccess(countries));
		dispatch(hideLoader());
	} catch (error) {
		dispatch(fetchCountriesFailure(error));
	}
};
