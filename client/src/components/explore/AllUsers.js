import React from 'react';
import UserContext from '../../context/users/userContext';
import { useContext, useEffect } from 'react';
import UserItem from './UserItem';

function AllUsers() {
	const userContext = useContext(UserContext);
	const { users, following, getUsers, getFollowers } = userContext;

	useEffect(() => {
		getUsers();
		getFollowers();
		// eslint-disable-next-line
	}, []);

	const others = users.filter(
		(o) => following.map((i) => i._id).indexOf(o._id) == -1
	);

	return (
		<div>
			{users.map((user) => (
				<UserItem key={user.id} user={user} button="Unfollow" />
			))}
		</div>
	);
}

export default AllUsers;
