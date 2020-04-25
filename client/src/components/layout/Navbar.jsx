import React, { useContext } from 'react';
import Logofull from '../auth/Logofull';
import Userimage from '../user/Userimage';
import AuthContext from '../../context/auth/authContext';

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
				<button onClick={logOut}>LogOUT</button>
				<input placeholder="Search" />
				<Userimage width="50px" />
			</nav>
		</div>
	);
}

export default Navbar;
