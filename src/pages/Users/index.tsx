import { FC, useEffect } from 'react';
import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { PostsStore } from 'store/posts';
import { TodosStore } from 'store/todos';
import { UsersStore } from 'store/users';
import { UsersHeader } from 'components/Users/Header';
import { UsersTable } from 'components/Users/Table';

export const UsersPage: FC = () => {
	console.log('page render');

	useEffect(() => {
		UsersStore.getAllTest();
		// TodosStore.getAll();
		// PostsStore.getAll();

		// setTimeout(() => {
		// 	PostsStore.getAll();
		// }, 2000);
	}, []);

	return (
		<Box>
			<UsersHeader />
			<UsersTable />
		</Box>
	);
};
