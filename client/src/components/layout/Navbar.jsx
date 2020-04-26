import React, { useContext } from 'react';
import Logofull from '../auth/Logofull';
import Userimage from '../user/Userimage';
import AuthContext from '../../context/auth/authContext';
import './layout.css'


function Navbar() {
	const authContext = useContext(AuthContext);

	const logOut = (e) => {
		e.preventDefault();
		authContext.logout();
	};

	return (
		<div>
			<nav className="nav">
				<Logofull fontSize="40px" />
				<input placeholder="Search" />
				<Userimage width="50px" />
				<button onClick={logOut}><img src={require('./logout.png')}  alt=""/></button>

			</nav>
		</div>
	);
}

export default Navbar;
