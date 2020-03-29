import React, { useContext } from 'react';
import Userimage from './Userimage';
import AuthContext from '../../context/auth/authContext';

function Userinfo() {
	const authContext = useContext(AuthContext);

	const { user } = authContext;

	console.log(user);

	return (
		<div className="user-info">
			<Userimage />
			<div className="info">
				<h1>UserNAme</h1>
				<h2>Followers Posts Following</h2>
			</div>
		</div>
	);
}

export default Userinfo;
