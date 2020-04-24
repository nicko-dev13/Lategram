import React from 'react';
import UserContext from '../../context/users/userContext';
import { useContext, useEffect } from 'react';
import UserItem from './UserItem';

function AllUsers() {
	const userContext = useContext(UserContext);
	const { users, getUsers } = userContext;

	useEffect(() => {
		getUsers();
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			{users.map((user) => (
				<UserItem key={user._id} user={user} />
			))}
		</div>
	);
}

export default AllUsers;
