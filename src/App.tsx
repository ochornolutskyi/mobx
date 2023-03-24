import { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { injectStores } from '@mobx-devtools/tools';
// pages
import { PostsPage, UsersPage } from 'pages';
// stores
import { PostsStore } from 'store/posts';
import { TodosStore } from 'store/todos';
import { UsersStore } from 'store/users';

const App: FC = () => (
	<Router>
		<Routes>
			<Route index element={<UsersPage />} />
			<Route path="/posts" element={<PostsPage />} />
		</Routes>
	</Router>
);

export default App;
