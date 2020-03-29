import React, { useContext, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import Userinfo from './Userinfo';
import AuthContext from '../../context/auth/authContext';

const Userpage = () => {
	const authContext = useContext(AuthContext);

	useEffect(() => {
		const loadingUser = async () => {
			await authContext.loadUser();
		};
		loadingUser();
		// eslint-disable-next-line
	}, []);

	return (
		<div className="user-page">
			<Navbar />
			<Userinfo />
		</div>
	);
};

export default Userpage;
