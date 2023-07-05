import { createContext, useContext, useState } from "react";
import Modal from "./Modal";

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

const AuthProvider = (props) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const auth = {
		isAuthenticated,
		fetchData: async (url) => {
			const token = localStorage.getItem('token');
			if (!token) {
				console.error('No token found. Please login first.');
				return;
			}

			try {
				const response = await fetch(url, {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				});

				if (response.ok) {
					const data = await response.json();
					// Process the fetched data
					console.log(data);
				} else {
					// Handle API error
					const errorData = await response.json();
					const errorMessage = errorData.message; // Assuming the server returns an error message
					console.error(errorMessage);
				}
			} catch (error) {
				console.error('An error occurred:', error);
			}
		},
		login: async (username, password) => {
			const response = await fetch('https://react.local/wp-json/jwt-auth/v1/token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, password })
			});
			console.log(response);
			if (response.ok) {
				const data = await response.json();
				const token = data.token; // Assuming the server returns the JWT in a 'token' field
				// Store the token in localStorage or a cookie for future requests
				localStorage.setItem('token', token);
				console.log(token);
				setIsAuthenticated(true);
			} else {
				// Handle authentication error
				const errorData = await response.json();
				const errorMessage = errorData.message; // Assuming the server returns an error message
				console.error(errorMessage);
				return (<Modal />);
			}
		},
		logout: () => {
			setIsAuthenticated(false);
		},
	};

	return (
		<AuthContext.Provider value={auth}>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;