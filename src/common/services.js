import axios from 'axios';
import { extendWithIds } from './helpers';
import { COUNTRIES_URL } from './constants';
import { showLoader, hideLoader, fetchCountriesSuccess, fetchCountriesFailure } from '../store/countries/actions';

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
