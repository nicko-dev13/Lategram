import React, { useContext, useState } from 'react';
import PostsContext from '../../context/posts/postsContext';

function PostForm() {
	const postsContext = useContext(PostsContext);

	const { addPost } = postsContext;

	const [post, setPost] = useState({
		postContent: '',
	});

	const { postContent } = post;

	const onChange = (e) => {
		setPost({
			...post,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		addPost(post);
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					name="postContent"
					onChange={onChange}
					value={postContent}
					style={{ width: '200px', margin: '100px 20px', height: '300px' }}
				/>
				<button type="submit">Post</button>
			</form>
		</div>
	);
}

export default PostForm;
