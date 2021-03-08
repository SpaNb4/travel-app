const SLICE_NAME = 'app';
const getSlice = (store) => store[SLICE_NAME];
export const getCurrLng = (store) => getSlice(store).currLng;
