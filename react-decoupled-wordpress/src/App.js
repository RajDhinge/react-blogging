import { useEffect, useRef } from 'react';
import './App.css';
import { useAuth } from './components/AuthProvider';
import Login from './components/Login';
import { Editor } from '@tinymce/tinymce-react';
import Navbar from './components/Navbar';
import Toast from './components/UI/Toast';
import useInternetStatus from './components/custom-hooks/useInternetStatus';
import useApiStatus from './components/custom-hooks/useApiStatus';
import { BASE_URL, TINY_MCE_KEY } from './components/constants';

function App() {
	const editorRef = useRef(null);
	const titleRef = useRef(null);
	const auth = useAuth();

	const log = () => {
		if (editorRef.current && titleRef.current) {
			console.log("Saving data");
			if (auth.isAuthenticated) {
				const body = JSON.stringify({
					title: titleRef.current.value,
					content: editorRef.current.getContent()
				});
				auth.fetchData('http://react.local/wp-json/wp/v2/posts', 'POST', body);
			}
		}
	};

	const internet = useInternetStatus();
	const apiStatus = useApiStatus(BASE_URL + '/wp-json');
	useEffect(() => {
		if (apiStatus) {
			console.log("Host is up");
		}

		return (() => {
			console.log("Calling Cleanup");
		});
	}, [apiStatus, internet]);

	useEffect(() => {
		if (internet) {
			(console.log("Internet On"));
		} else {
			(console.log("Internet Off"));
		}
	}, [internet])

	return (
		<>
			{auth.isAuthenticated ?
				(
					<>
						<Navbar onSave={log} onLogout={auth.logout} />
						<Toast />
						<br />
						<div className="mb-6">
							<label htmlFor="default-input" className="text-3xl md:text-4xl block mb-2 font-medium text-gray-900">Blog Title</label>
							<input placeholder="Title" type="text" id="default-input" className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" ref={titleRef} />
						</div>
						<Editor
							apiKey={TINY_MCE_KEY}
							onInit={(evt, editor) => editorRef.current = editor}
							initialValue=""
							init={{
								height: 500,
								menubar: false,
								plugins: ["image", "code", "table", "link", "media", "codesample"],
								toolbar: 'undo redo | formatselect | ' +
									'bold italic backcolor | alignleft aligncenter ' +
									'alignright alignjustify | bullist numlist outdent indent | ' +
									'image code table link media codesample ' + 'removeformat | help',
								content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
							}}
						/>
					</>
				) :
				<Login />}
		</>
	);
}

export default App;
