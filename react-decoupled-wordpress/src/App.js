import { useRef } from 'react';
import './App.css';
import { useAuth } from './components/AuthProvider';
import Login from './components/Login';
import { Editor } from '@tinymce/tinymce-react';
import { CheckIcon } from '@heroicons/react/20/solid';
import Navbar from './components/Navbar';

function App() {
	const editorRef = useRef(null);
	const auth = useAuth();

	const log = () => {
		if (editorRef.current) {
			console.log(editorRef.current.getContent());
			alert("Saving Data");
			if (auth.isAuthenticated) {
				const body = JSON.stringify({
					title: 'My New Post',
					content: editorRef.current.getContent()
				});
				auth.fetchData('http://react.local/wp-json/wp/v2/posts', 'POST', body);
			}
		}
	};

	return (
		<>
			{auth.isAuthenticated ?
				(
					<>
						<Navbar onSave={log} onLogout={auth.logout} />
						<br />
						<div class="mb-6">
							<label for="default-input" class="text-3xl md:text-4xl block mb-2 font-medium text-gray-900">Blog Title</label>
							<input placeholder="Title" type="text" id="default-input" class="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
						</div>
						<Editor
							onInit={(evt, editor) => editorRef.current = editor}
							initialValue=""
							init={{
								height: 500,
								menubar: false,
								plugins: [
									'advlist autolink lists link image charmap print preview anchor',
									'searchreplace visualblocks code fullscreen',
									'insertdatetime media table paste code help wordcount'
								],
								toolbar: 'undo redo | formatselect | ' +
									'bold italic backcolor | alignleft aligncenter ' +
									'alignright alignjustify | bullist numlist outdent indent | ' +
									'removeformat | help',
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
