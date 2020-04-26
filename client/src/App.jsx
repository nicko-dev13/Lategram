import React from 'react';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';
import AuthState from './context/auth/AuthState';
import setAuthToken from './utils/setAuthToken';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Userpage from './components/user/Userpage';
import PostForm from './components/posts/PostForm';
import PostState from './context/posts/PostState';
import UserState from './context/users/UserState';
import AllUsers from './components/explore/AllUsers';
import Feed from './components/explore/Feed';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

function App() {
	return (
		<AuthState>
			<PostState>
				<UserState>
					<Router>
						<Switch>
							<PrivateRoute
								exact
								path='/home'
								component={Userpage}
							/>
							<Route exact path='/' component={Register} />
							<Route exact path='/login' component={Login} />
							<Route exact path='/post' component={PostForm} />
							<Route exact path='/users' component={AllUsers} />
							<Route exact path='/feed' component={Feed} />
						</Switch>
					</Router>
				</UserState>
			</PostState>
		</AuthState>
	);
}

export default App;
