import React, { useContext, useEffect } from 'react';
import PostContext from '../../context/posts/postContext';
import postContext from '../../context/posts/postContext';

function PostsComponent({ post: { postContent, likes } }) {
    return (
        <div className='post-container'>
            <h4>{postContent}</h4>
            <p>likes {likes.length}</p>
        </div>
    );
}

export default PostsComponent;
