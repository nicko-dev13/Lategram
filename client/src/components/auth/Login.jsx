import React, { useContext, useState, useEffect } from 'react';
import Logofull from './Logofull';
import AuthContext from '../../context/auth/authContext';
import { Link } from 'react-router-dom';
import './auth.css';


const Login = (props) => {
	const authContext = useContext(AuthContext);

	const { login, isAuthenticated } = authContext;

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
		login({
			email: email,
			password: password
		});
	};

	const { email, password } = user;

	return (
		<div className="dabba">
					<div className="left">
						<img src={require('./Capture.PNG')} alt=""/>
					</div>
					<div className="right">
					<div className="form-page">
			<div className="form-container">
				<form onSubmit={onSubmit}>
					<Logofull fontSize="70px" />
					<h4>Sign up to see photos and videos from your friends.</h4>
					<hr />
					<input type="email" name="email" onChange={onChange} placeholder="Enter Email" value={email} />
					<input
						type="password"
						name="password"
						onChange={onChange}
						placeholder="Password"
						value={password}
					/>
					<button type="submit">Login</button>
					<p>
						By signing up, you agree to our <b>Terms, Data Policy</b> and <b>Cookies Policy .</b>{' '}
					</p>
				</form>
			</div>
			<div className="alt-link">
				<p>
					Don't have an account? <Link to="/">Sign Up</Link>
				</p>
			</div>
		</div>
					</div>
		</div>
		
	);
};

export default Login;
