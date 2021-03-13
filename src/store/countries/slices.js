import { SLICE_NAME } from './action-types';

const getSlice = (store) => store[SLICE_NAME];
export const getAllCountries = (store) => getSlice(store).countries;
export const getCountriesLoading = (store) => getSlice(store).loading;
export const getSearchValue = (store) => getSlice(store).searchValue;
export const getFilteredCountries = (store) =>
	getSlice(store).countries.filter(
		(country) =>
			country.name.toLowerCase().includes(getSearchValue(store).toLowerCase()) ||
			country.capital.toLowerCase().includes(getSearchValue(store).toLowerCase())
	);
