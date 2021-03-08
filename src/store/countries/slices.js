import { getCurrLng } from '../app/slices';

const SLICE_NAME = 'countries';
const getSlice = (store) => store[SLICE_NAME];
export const getAllCountries = (store) => getSlice(store).countries;
export const getCountriesLoading = (store) => getSlice(store).loading;
export const getSearchValue = (store) => getSlice(store).searchValue;
export const getFilteredCountries = (store) =>
	getSlice(store).countries.filter(
		(country) =>
			country.countryName[getCurrLng(store)].toLowerCase().includes(getSearchValue(store).toLowerCase()) ||
			country.capitalName[getCurrLng(store)].toLowerCase().includes(getSearchValue(store).toLowerCase())
	);
