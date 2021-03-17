import { SLICE_NAME } from './action-types';

const getSlice = (store) => store[SLICE_NAME];
export const getCurrLng = (store) => getSlice(store).currLng;
export const getUsername = (store) => getSlice(store).username;
