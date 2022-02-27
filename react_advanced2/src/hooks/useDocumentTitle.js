import { useEffect } from 'react';

export default function useDocumentTitle(title) {
	// allows us to hook into our component's life cycle methods
	useEffect(() => {
		// arrow function called every time our component renders
		document.title = title;

		// we can optionally return a function with cleanup code. this acts as the componentWillUnmount method
		return () => {
			console.log('cleanup');
		};
	});
}
