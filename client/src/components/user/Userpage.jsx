import React, { useContext, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import Userinfo from './Userinfo';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../layout/spinner.gif';

const Userpage = () => {
	const authContext = useContext(AuthContext);

	const { loading, loadUser } = authContext;

	useEffect(() => {
		const loadingUser = async () => {
			await loadUser();
		};
		loadingUser();
		console.log('useEffect');
		// eslint-disable-next-line
	}, []);

	console.log('in User page');
	if (loading) {
		return <Spinner />;
	} else {
		return (
			<div className="user-page">
				<Navbar />
				<Userinfo />
			</div>
		);
	}
};

export default Userpage;
