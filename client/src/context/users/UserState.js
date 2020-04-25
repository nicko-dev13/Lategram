import React, { useReducer } from 'react';
import UserContext from './userContext';
import userReducer from './userReducer';
import axios from 'axios';

import { GET_USERS, GET_FOLLOWERS } from '../types';

const UserState = (props) => {
	const initialState = {
		users: [],
		following: [],
	};

	const [state, dispatch] = useReducer(userReducer, initialState);

	// Get All Users
	const getUsers = async () => {
		try {
			const res = await axios.get('/api/users');
			dispatch({ type: GET_USERS, payload: res.data });
		} catch (error) {
			//////////////////// ADD DISPATCH HERE
			console.log('ERROR FETCHING USERS');
		}
	};

	// Get Followers
	const getFollowers = async () => {
		try {
			const res = await axios.get('/api/profile/following');
			dispatch({ type: GET_FOLLOWERS, payload: res.data });
		} catch (error) {
			console.log(error);
		}
	};

	// Follow User by Id
	const followUser = async (id) => {
		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const res = await axios.post(
				`api/profile/follow/${id}`,
				id,
				config
			);
			console.log('FOLLOWED USING REACT');
		} catch (error) {
			//////////////////// ADD DISPATCH HERE
			console.log(error);
		}
	};

	return (
		<UserContext.Provider
			value={{
				users: state.users,
				following: state.following,
				getUsers,
				getFollowers,
				followUser,
			}}
		>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserState;
