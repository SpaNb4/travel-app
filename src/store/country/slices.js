import { SLICE_NAME } from './action-types';

const getSlice = (store) => store[SLICE_NAME];
export const getCurrentCountry = (store) => getSlice(store).currentCountry;
export const getCountryLoading = (store) => getSlice(store).loading;
export const getCurrentId = (store) => getSlice(store).currentId;
export const getPlaces = (store) => getCurrentCountry(store).places;
