import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const authContext = useContext(AuthContext);

	const { loading, isAuthenticated } = authContext;

	return (
		<Route
			{...rest}
			render={(props) => (!isAuthenticated && !loading ? <Redirect to="/" /> : <Component {...props} />)}
		/>
	);
};

export default PrivateRoute;
