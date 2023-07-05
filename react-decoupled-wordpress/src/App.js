import './App.css';
import { useAuth } from './components/AuthProvider';
import Login from './components/Login';

function App() {
	const auth = useAuth();
	// if (auth.isAuthenticated) {
	// 	const body = JSON.stringify({
	// 		title: 'My New Post',
	// 		content: 'This is the content of my post.'
	// 	});
	// 	auth.fetchData('http://react.local/wp-json/wp/v2/posts', 'POST', body);
	// }

	return (
		<>
			{auth.isAuthenticated ?
				(
					<>
						<button onClick={auth.logout}>logout</button><br />Welcome!
					</>
				) :
				<Login />}
		</>
	);
}

export default App;
