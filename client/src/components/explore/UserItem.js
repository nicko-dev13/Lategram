import React, { useContext } from 'react';
import UserContext from '../../context/users/userContext';

function UserItem({ user, button }) {
	const userContext = useContext(UserContext);
	const { followUser, unFollowUser } = userContext;

	const onClick = () => {
		button == 'Follow' ? followUser(user._id) : unFollowUser(user._id);
	};
	return (
		<div>
			<span>{user.name}</span>
			<button onClick={onClick}>{button}</button>
			<div className="empty">----------------------</div>
		</div>
	);
}

export default UserItem;
