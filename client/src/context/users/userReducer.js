import { GET_USERS, GET_FOLLOWERS } from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_USERS:
			return {
				...state,
				users: action.payload,
			};
		case GET_FOLLOWERS:
			return {
				...state,
				following: action.payload,
			};
		default:
			return state;
	}
};
