import * as types from './action-types';
import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { COUNTRIES_URL } from '../../common/constants';
import { PLACES_URL } from '../../common/constants';

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

export const setRate = (rate, username, currPlace) => async (dispatch) => {
	try {
		const response = await axios(`${PLACES_URL}`);
		const places = response.data;
		const place = places.filter((place) => place.imageUrl === currPlace.imageUrl);
		try {
			const response = await axios({
				method: 'post',
				url: `${PLACES_URL}/${place[0].id}`,
				data: {
					name: username,
					rate: rate,
				},
			});
			console.log(response);
			dispatch(updatePlace(response.data.errors));
		} catch (error) {
			dispatch(setRateFailure(error));
		}
	} catch (error) {
		dispatch(setRateFailure(error));
	}
};
