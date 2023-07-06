import { useState, useEffect } from 'react';

const useInternetStatus = () => {
	const [isInternetUp, setIsInternetUp] = useState(navigator.onLine);

	useEffect(() => {
		const handleOnlineStatus = () => setIsInternetUp(true);
		const handleOfflineStatus = () => setIsInternetUp(false);

		window.addEventListener('online', handleOnlineStatus);
		window.addEventListener('offline', handleOfflineStatus);

		return () => {
			window.removeEventListener('online', handleOnlineStatus);
			window.removeEventListener('offline', handleOfflineStatus);
		};
	}, []);

	return isInternetUp;
};

export default useInternetStatus;