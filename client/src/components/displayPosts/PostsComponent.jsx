import React, { useContext, useEffect } from 'react';
import PostContext from '../../context/posts/postContext';
import postContext from '../../context/posts/postContext';

function PostsComponent({ post: { postContent, likes } }) {
    const onLike = () => {
        console.log('OnLike');
    };

    return (
        <div className='post-container'>
            <h4>{postContent}</h4>
            <button onClick={onLike}>Likes {likes.length}</button>
        </div>
    );
}

export default PostsComponent;
