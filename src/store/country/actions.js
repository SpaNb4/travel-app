import * as types from './action-types';
import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { COUNTRIES_URL } from '../../common/constants';

export const fetchCountrySuccess = createAction(types.FETCH_COUNTRY_SUCCESS);
export const fetchCountryFailure = createAction(types.FETCH_COUNTRY_FAILURE);
export const showLoader = createAction(types.SHOW_LOADER);
export const hideLoader = createAction(types.HIDE_LOADER);
export const getCountryId = createAction(types.GET_COUNTRY_ID);

export const fetchCountry = (currentId, currLang) => async (dispatch) => {
	try {
		dispatch(showLoader());
		const response = await axios(`${COUNTRIES_URL}/${currentId}`, {
			params: { countryId: currentId, lang: currLang },
		});
		const country = response.data;
		dispatch(fetchCountrySuccess(country));
		dispatch(hideLoader());
	} catch (error) {
		dispatch(fetchCountryFailure(error));
	}
};
