import { ADD_POST, SET_LOADING, GET_POST } from '../types';

export default (state, action) => {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, loading: true };
        case ADD_POST:
            return {
                ...state,
                posts: action.payload,
                loading: false,
            };
        case GET_POST:
            return {
                ...state,
                posts: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};
