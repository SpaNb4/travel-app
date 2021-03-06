import * as t from './action-types';

export const updateSearchValue = (value) => ({
  type: t.UPDATE_SEARCH_VALUE,
  payload: { value },
})

