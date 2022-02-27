import React, { Component } from 'react';
import MovieRow from './MovieRow';
import UserContext from './userContext';

class MovieList extends Component {
	// static property: property that belongs to a class not an object
	static contextType = UserContext;

	componentDidMount() {
		console.log('context', this.context);
	}

	render() {
		return (
			// consumer component expects a function so pass additional elements through arrow/lambda function
			<UserContext.Consumer>
				{(UserContext) => (
					<div>
						Movie List{' '}
						{UserContext.currentUser ? UserContext.currentUser.name : ''}{' '}
						<MovieRow />
					</div>
				)}
			</UserContext.Consumer>
		);
	}
}

// static property: property that belongs to a class not an object
MovieList.contextType = UserContext;

export default MovieList;
