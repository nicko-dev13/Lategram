import React from 'react';
import UserContext from '../../context/users/userContext';
import { useContext, useEffect } from 'react';

function AllUsers() {
	const userContext = useContext(UserContext);
	const { users, getUsers } = userContext;

	useEffect(() => {
		getUsers();
	}, [users, getUsers]);

	return <div>{users}</div>;
}

export default AllUsers;
