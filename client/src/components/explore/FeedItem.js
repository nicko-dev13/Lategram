import React from 'react';

function FeedItem({ feedProp }) {
	return (
		<div className='user-item'>
			<span>{feedProp.postContent}</span>
			<div>likes {feedProp.likes}</div>
			<div className='empty'>================================</div>
		</div>
	);
}

export default FeedItem;
