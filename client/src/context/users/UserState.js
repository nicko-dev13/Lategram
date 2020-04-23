import React, { useReducer } from 'react';
import UserContext from './userContext';
import userReducer from './userReducer';
import axios from 'axios';

import { GET_USERS } from '../types';

const UserState = (props) => {
	const initialState = {
		users: null,
	};

	const [state, dispatch] = useReducer(userReducer, initialState);

	// Get All Users
	const getUsers = async () => {
		try {
			const res = await axios.get('/api/users');
			dispatch({ type: GET_USERS, payload: res.data });
		} catch (error) {}
	};

	return (
		<UserContext.Provider value={{ users: state.users, getUsers }}>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserState;
