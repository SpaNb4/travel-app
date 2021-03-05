import { START_GAME } from '../actionTypes';
import initialState from '../initialState';

export default function reducer1(state = initialState, action) {
	switch (action.type) {
		case START_GAME:
			return { ...state, isGameStart: true, isEnd: false };
		default:
			return state;
	}
}
