import * as types from './action-types';
import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { PLACES_URL } from '../../common/constants';

export const updateCurrLng = createAction(types.UPDATE_CURRENT_LANGUAGE);
export const registerSuccess = createAction(types.REGISTER_SUCCESS);
export const loginSuccess = createAction(types.LOGIN_SUCCESS);
export const logout = createAction(types.LOGOUT_SUCCESS);
export const setRateFailure = createAction(types.SET_RATE_FAILURE);

export const setRate = (rate, username, currPlace) => async (dispatch) => {
	try {
		const response = await axios(`${PLACES_URL}`);
		const places = response.data;
		const place = places.filter((place) => place.imageUrl === currPlace.imageUrl);
		try {
			await axios({
				method: 'post',
				url: `${PLACES_URL}/${place[0].id}`,
				data: {
					name: username,
					rate: rate,
				},
			});
		} catch (error) {
			dispatch(setRateFailure(error));
		}
	} catch (error) {
		dispatch(setRateFailure(error));
	}
};
