import './App.css';
import Movie from './higherOrderComponents/movie';
import Counter from './hooks/Counter';
import Users from './hooks/Users';
import MoviePage from './context/MoviePage';
import React, { Component } from 'react';
import UserContext from './context/userContext';
import CartContext from './context/cartContext';
import Login from './context/Login';

class App extends Component {
	// this is the value that the user enters in the login form
	handleLoggedIn = (username) => {
		console.log(`Getting the user: ${username}`);
		const user = { name: 'Shawn' };
		this.setState({ currentUser: user });
	};

	state = { currentUser: null };

	render() {
		return (
			<CartContext.Provider value={{ cart: [] }}>
				<UserContext.Provider
					value={{
						currentUser: this.state.currentUser,
						onLoggedIn: this.handleLoggedIn,
					}}>
					<div>
						<Movie id={1} />
						<Counter />
						<Users />
						<MoviePage />
						<Login />
					</div>
				</UserContext.Provider>
			</CartContext.Provider>
		);
	}
}

export default App;
