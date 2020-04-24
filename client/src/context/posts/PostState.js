import React, { useReducer } from 'react';
import axios from 'axios';
import PostContext from './postContext';
import postReducer from './postReducer';

import { ADD_POST, ADD_POST_ERROR, SET_LOADING } from '../types';

const PostState = (props) => {
    const initialState = {
        posts: null,
        error: null,
        loading: false,
    };

    const [state, dispatch] = useReducer(postReducer, initialState);

    const setLoading = async () => {
        dispatch({ type: SET_LOADING });
    };

    // Add Post
    const addPost = async (post) => {
        const config = {
            header: {
                'Content-Type': 'application/json',
            },
        };

        try {
            setLoading();
            const res = await axios.post('/api/posts', post, config);
            console.log(res.data);
            dispatch({ type: ADD_POST, payload: res.data });
        } catch (error) {
            dispatch({
                type: ADD_POST_ERROR,
                payload: error.response.data.msg,
            });
        }
    };

    return (
        <PostContext.Provider
            value={{
                posts: state.posts,
                loading: state.loading,
                addPost,
                setLoading,
            }}
        >
            {props.children}
        </PostContext.Provider>
    );
};

export default PostState;
