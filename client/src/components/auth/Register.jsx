import React, { useContext, useState, useEffect } from 'react';
import Logofull from './Logofull';
import AuthContext from '../../context/auth/authContext';
import { Link } from 'react-router-dom';

const Register = (props) => {
	const authContext = useContext(AuthContext);

	const { register, isAuthenticated } = authContext;

	useEffect(
		() => {
			if (isAuthenticated) {
				props.history.push('/home');
			}
		},
		//eslint-disable-next-line
		[ isAuthenticated, props.history ]
	);

	const [ user, setUser ] = useState({
		name: '',
		email: '',
		password: ''
	});

	const onChange = (e) =>
		setUser({
			...user,
			[e.target.name]: e.target.value
		});

	const onSubmit = (e) => {
		e.preventDefault();
		register({
			name: name,
			email: email,
			password: password
		});
	};

	const { name, email, password } = user;

	return (
		<div className="form-page">
			<div className="form-container">
				<form onSubmit={onSubmit}>
					<Logofull fontSize="70px" />
					<h4>Sign up to see photos and videos from your friends.</h4>
					<hr />
					<input type="email" name="email" onChange={onChange} placeholder="Enter Email" value={email} />
					<input type="text" name="name" onChange={onChange} placeholder="First Name" value={name} />
					<input
						type="password"
						name="password"
						onChange={onChange}
						placeholder="Password"
						value={password}
					/>
					<button type="submit">Sign Up</button>
					<p>
						By signing up, you agree to our <b>Terms, Data Policy</b> and <b>Cookies Policy .</b>{' '}
					</p>
				</form>
			</div>
			<div className="alt-link">
				<p>
					Have an account? <Link to="/login">Login</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;
