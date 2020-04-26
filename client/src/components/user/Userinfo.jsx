import React, { useContext } from 'react';
import Userimage from './Userimage';
import AuthContext from '../../context/auth/authContext';
import PostsComponent from '../displayPosts/PostsComponent';
import { useEffect } from 'react';
import postContext from '../../context/posts/postContext';
import Spinner from '../layout/Spinner';

function Userinfo() {
	const authContext = useContext(AuthContext);

	const PostContext = useContext(postContext);

	const { getPosts, loading, posts } = PostContext;

	useEffect(() => {
		getPosts();
		// eslint-disable-next-line
	}, []);

	const { user } = authContext;

	return (
		<div className="user-info">
			<div className="info-header">
				<Userimage width="5vw" />
				<div className="info">
					<p>{user.name}</p>
					<br />
					<br />
					<span>
						<b>99</b>
						<p>posts </p>
					</span>
					<span>
						<b>420</b>
						<p>followers </p>
					</span>
					<span>
						<b>69</b>
						<p> following </p>
					</span>
					<br />
					<br />
					<p>Also known as pako and cko and mako and kako and taco</p>
				</div>
			</div>
			<div className="post-container">
				{!loading && posts !== null ? (
					posts.map((post) => (
						<PostsComponent key={post._id} post={post} />
					))
				) : (
					<Spinner />
				)}
			</div>
		</div>
	);
}

export default Userinfo;
