import { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UsersPage } from 'pages';

const App: FC = () => (
	<Router>
		<Routes>
			<Route index element={<UsersPage />} />
		</Routes>
	</Router>
);

export default App;
