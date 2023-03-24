import { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PostsPage, UsersPage } from 'pages';

const App: FC = () => (
	<Router>
		<Routes>
			<Route index element={<UsersPage />} />
			<Route path="/posts" element={<PostsPage />} />
		</Routes>
	</Router>
);

export default App;
