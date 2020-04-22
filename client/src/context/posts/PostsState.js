import React, { useReducer } from 'react';
import axios from 'axios';
import PostsContext from './postsContext';
import postsReducer from './postsReducer';

import { ADD_POST } from '../types';

const PostsState = (props) => {
	const initialState = {
		post: null,
	};

	const [state, dispatch] = useReducer(postsReducer, initialState);

	// Add {ost
	const addPost = async (post) => {
		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/users', post, config);
			dispatch({ type: ADD_POST, payload: res.data });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<PostsContext.Provider
			value={{
				post: state.post,
				addPost,
			}}
		>
			{props.children}
		</PostsContext.Provider>
	);
};

export default PostsState;
