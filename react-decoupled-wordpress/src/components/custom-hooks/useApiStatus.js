import { useState, useEffect } from 'react';
import { useAuth } from '../AuthProvider';

const useApiStatus = (url) => {
	const [isApiUp, setIsApiUp] = useState(false);
	const auth = useAuth();
	const token = auth.token;

	useEffect(() => {
		const checkApiStatus = async () => {
			try {
				const response = await fetch(url, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				});

				if (response.ok) {
					setIsApiUp(true);
				} else {
					const errorData = await response.json();
					if (errorData.code === 'jwt_auth_invalid_token') {
						auth.logout();
					}
					setIsApiUp(false);
				}
			} catch (error) {
				setIsApiUp(false);
			}
		};

		if (token) {
			checkApiStatus();
		}
	}, [url, auth, token]);

	return isApiUp;
};

export default useApiStatus;