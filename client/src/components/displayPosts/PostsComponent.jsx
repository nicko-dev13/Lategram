import React from 'react';

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
