import { GET_USERS, GET_FOLLOWERS, GET_FEED } from '../types';

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
		case GET_FEED:
			return {
				...state,
				feed: action.payload,
			};
		default:
			return state;
	}
};
