import './App.css';
import { useAuth } from './components/AuthProvider';
import Login from './components/Login';

function App() {
	const auth = useAuth();
	console.log(auth.isAuthenticated);
	return (
		<>
			<Login />
		</>
	);
}

export default App;
