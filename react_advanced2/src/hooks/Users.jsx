import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Users(props) {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		async function getUsers() {
			const result = await axios('https://jsonplaceholder.typicode.com/users'); // promise we get from axios
			setUsers(result.data); // this will set our state variable and rerender our component
		}
		getUsers();
	});

	return (
		<div>
			<ul>
				{users.map((user) => (
					<li key={user.id}>{user.name}</li>
				))}
			</ul>
		</div>
	);
}

export default Users;
