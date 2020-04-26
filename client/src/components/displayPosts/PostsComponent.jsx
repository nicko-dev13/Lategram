import React from 'react';

function PostsComponent({ post: { postContent, likes } }) {
	const onLike = () => {
		console.log('OnLike');
	};

	return (
		<div className="post">
			<h4>{postContent}</h4>
			<button id="btn" onClick={onLike}>
				Likes {likes.length}
			</button>
		</div>
	);
}

export default PostsComponent;
