import React, { useContext, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import Userinfo from './Userinfo';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../layout/Spinner';

const Userpage = () => {
	const authContext = useContext(AuthContext);

	const { loading, loadUser, user } = authContext;

	useEffect(() => {
		const loadingUser = async () => {
			await loadUser();
		};
		loadingUser();
		console.log('useEffect');
		// eslint-disable-next-line
	}, []);

	if (loading || user === null) {
		return <Spinner />;
	} else {
		return (
			<div className='user-page'>
				<Navbar />
				<Userinfo />
			</div>
		);
	}
};

export default Userpage;
