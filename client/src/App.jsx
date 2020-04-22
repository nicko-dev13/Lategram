import React from 'react';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';
import AuthState from './context/auth/AuthState';
import setAuthToken from './utils/setAuthToken';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Userpage from './components/user/Userpage';
import PostForm from './components/posts/PostForm';
import PostsState from './context/posts/PostsState';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

function App() {
	return (
		<AuthState>
			<PostsState>
				<Router>
					<Switch>
						<PrivateRoute exact path="/home" component={Userpage} />
						<Route exact path="/" component={Register} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/post" component={PostForm} />
					</Switch>
				</Router>
			</PostsState>
		</AuthState>
	);
}

export default App;
