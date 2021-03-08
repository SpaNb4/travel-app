import * as types from './action-types';
import { createAction } from '@reduxjs/toolkit';

export const updateCurrLng = createAction(types.UPDATE_CURRENT_LANGUAGE);
