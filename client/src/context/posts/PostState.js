import React, { useReducer } from 'react';
import axios from 'axios';
import PostContext from './postContext';
import postReducer from './postReducer';

import { ADD_POST, POST_ERROR, SET_LOADING, GET_POST } from '../types';

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
            console.log(error);
            dispatch({
                type: POST_ERROR,
                payload: error.response.msg,
            });
        }
    };

    // Get Posts
    const getPosts = async () => {
        try {
            setLoading();
            const res = await axios.get('/api/posts');
            console.log(res.data);
            dispatch({ type: GET_POST, payload: res.data });
        } catch (error) {
            console.log(error);
            dispatch({
                type: POST_ERROR,
                payload: error.msg,
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
                getPosts,
            }}
        >
            {props.children}
        </PostContext.Provider>
    );
};

export default PostState;
