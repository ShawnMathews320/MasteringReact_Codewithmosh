import React, { useContext } from 'react';
import CartContext from './cartContext';
import UserContext from './userContext';

function MovieRow(props) {
	const userContext = useContext(UserContext); // returns our UserContext object, which is the current user
	const cartContext = useContext(CartContext); // this is how we are consuming a context in a functional component

	console.log('cart context: ', cartContext);

	return (
		<div>
			Movie Row {userContext.currentUser ? userContext.currentUser.name : ''}
		</div>
	);
}

export default MovieRow;
