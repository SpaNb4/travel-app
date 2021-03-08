import * as types from './action-types';
import { createAction } from '@reduxjs/toolkit';

export const updateSearchValue = createAction(types.UPDATE_SEARCH_VALUE);
export const fetchCountriesSuccess = createAction(types.FETCH_COUNTRIES_SUCCESS);
export const fetchCountriesFailure = createAction(types.FETCH_COUNTRIES_FAILURE);
export const showLoader = createAction(types.SHOW_LOADER);
export const hideLoader = createAction(types.HIDE_LOADER);
export const getCountryId = createAction(types.GET_COUNTRY_ID);
