import * as types from './action-types';
import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ExternalUrls } from '../../common/constants';

export const fetchCountrySuccess = createAction(types.FETCH_COUNTRY_SUCCESS);
export const fetchCountryFailure = createAction(types.FETCH_COUNTRY_FAILURE);
export const showLoader = createAction(types.SHOW_LOADER);
export const hideLoader = createAction(types.HIDE_LOADER);
export const getCountryId = createAction(types.GET_COUNTRY_ID);
export const setRateFailure = createAction(types.SET_RATE_FAILURE);
export const updatePlace = createAction(types.UPDATE_PLACE);

export const fetchCountry = (currentId, currLang) => async (dispatch) => {
	try {
		dispatch(showLoader());
		const { data: country } = await axios(`${ExternalUrls.Countries}/${currentId}`, {
			params: { countryId: currentId, lang: currLang },
		});
		dispatch(fetchCountrySuccess(country));
		dispatch(hideLoader());
	} catch (error) {
		dispatch(fetchCountryFailure(error));
	}
};

export const setRate = (rate, username, currPlace) => async (dispatch) => {
	try {
		const { data: places } = await axios(`${ExternalUrls.Places}`);
		const place = places.filter((place) => place.imageUrl === currPlace.imageUrl);
		const { data } = await axios({
			method: 'post',
			url: `${ExternalUrls.Places}/${place[0].id}`,
			data: {
				name: username,
				rate: rate,
			},
		});
		dispatch(updatePlace(data.success));
	} catch (error) {
		dispatch(setRateFailure(error));
	}
};
