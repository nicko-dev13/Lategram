import React from 'react';
import UserContext from '../../context/users/userContext';
import { useContext, useEffect } from 'react';
import FeedItem from './FeedItem';

function Feed() {
	const userContext = useContext(UserContext);
	const { feed, getFeed } = userContext;

	useEffect(() => {
		getFeed();
	}, [feed]);

	return (
		<div>
			{feed.map((f) => (
				<FeedItem id={f._id} feedProp={f} />
			))}
		</div>
	);
}

export default Feed;
