import React, { Fragment, useState } from 'react';
import useDocumentTitle from './useDocumentTitle';

function Counter(props) {
	// useState returns an array of two items: the first item is the value of our counter and is assigned to count, the second
	// is a function for updating the value which is assigned to setCount.
	const [count, setCount] = useState(0); // array destructuring
	const [name, setName] = useState('');

	useDocumentTitle(`${name} has clicked ${count} times!`);

	return (
		<Fragment>
			<input type='text' onChange={(e) => setName(e.target.value)} />
			<div>
				{/* this is where we display the value of our counter */}
				{name} has clicked {count} times!
			</div>
			<button onClick={() => setCount(count + 1)}>Increase</button>
		</Fragment>
	);
}

export default Counter;
