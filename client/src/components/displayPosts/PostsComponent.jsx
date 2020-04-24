import React, { useContext } from 'react';
import PostContext from '../../context/posts/postContext';
import postContext from '../../context/posts/postContext';

function PostsComponent() {
    const postContext = useContext(PostContext);

    const { post, loading } = postContext;

    return <div className='post-container'></div>;
}

export default PostsComponent;
