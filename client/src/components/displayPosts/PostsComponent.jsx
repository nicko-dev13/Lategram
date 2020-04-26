import React from 'react';

function PostsComponent({ post: { postContent, likes } }) {
    const onLike = () => {
        console.log('OnLike');
    };

    return (
        <div className='post-container'>
            <div className="flexo">
                    <div><h4>{postContent}</h4></div> 
                    <div><button id="btn" onClick={onLike}>Likes {likes.length}</button></div> 
            </div>
                   
        </div>
    );
}

export default PostsComponent;
