import { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "./constants.js";

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

const AuthProvider = (props) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [token, setToken] = useState(false);

	const auth = {
		isAuthenticated: isAuthenticated,
		token: token,
		fetchData: async (url, method = 'GET', body = '') => {


			console.log(url);
			console.log(method);
			console.log(body);
			console.log(auth.token);
			console.log(auth.isAuthenticated);

			const token = localStorage.getItem('token');

			if (!token) {
				console.error('No token found. Please login first.');
				return;
			}



			console.log("1");
			try {
				console.log("Processing the data upload");
				const response = await fetch(url, {
					method: method,
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					},
					body: body
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
			const token = localStorage.getItem('token');

			if (!token) {
				const response = await fetch(BASE_URL + '/wp-json/jwt-auth/v1/token', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ username, password })
				});
				console.log(response);
				if (response.ok) {
					const data = await response.json();
					const curr_token = data.token; // Assuming the server returns the JWT in a 'token' field
					// Store the token in localStorage or a cookie for future requests
					localStorage.setItem('token', curr_token);
					console.log(curr_token);
					setToken(curr_token);
					setIsAuthenticated(true);
				} else {
					// Handle authentication error
					const errorData = await response.json();
					const errorMessage = errorData.message; // Assuming the server returns an error message
					console.error(errorMessage);
					return false;
				}
			} else {
				console.log('already logged in');
			}
		},
		logout: () => {
			setIsAuthenticated(false);
			setToken('');
			localStorage.removeItem("token");
		},
	};

	useEffect(
		() => {
			if (localStorage.getItem('token')) {
				console.log(localStorage.getItem('token'));
				setToken(localStorage.getItem('token'));
				setIsAuthenticated(true);
			}
		},
		[]
	);


	return (
		<AuthContext.Provider value={auth}>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;