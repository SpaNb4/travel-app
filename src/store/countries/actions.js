import * as t from './action-types';
import { default as uniqid } from 'uniqid';
import axios from 'axios';

const COUNTRIES_URL = 'https://kovalenkoiryna15.github.io/countries/countries-ira.json';

export const updateSearchValue = (value) => ({
	type: t.UPDATE_SEARCH_VALUE,
	payload: { value },
});

export const fetchCountriesSuccess = (countries) => ({
	type: t.FETCH_COUNTRIES_SUCCESS,
	payload: countries,
});

export const fetchCountriesFailure = (error) => ({
	type: t.FETCH_COUNTRIES_FAILURE,
	payload: error,
});

export const showLoader = () => ({
	type: t.SHOW_LOADER,
});

export const hideLoader = () => ({
	type: t.HIDE_LOADER,
});

const extendCountriesWithIds = (data) =>
	Object.fromEntries(
		Object.entries(data).map(([key, value]) => [
			key,
			{
				...value,
				id: uniqid(),
			},
		])
	);

export const fetchCountries = () => async (dispatch) => {
	try {
		dispatch(showLoader());
		const response = await axios(COUNTRIES_URL);
		const countriesWithIds = Object.values(extendCountriesWithIds(response.data));
		dispatch(fetchCountriesSuccess(countriesWithIds));
		dispatch(hideLoader());
	} catch (error) {
		dispatch(fetchCountriesFailure(error));
	}
};
