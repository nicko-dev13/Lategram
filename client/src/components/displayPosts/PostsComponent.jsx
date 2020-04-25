import React, { useContext, useEffect } from 'react';
import PostContext from '../../context/posts/postContext';
import postContext from '../../context/posts/postContext';

function PostsComponent({ post: { postContent } }) {
    return <div className='post-container'>{postContent}</div>;
}

export default PostsComponent;
