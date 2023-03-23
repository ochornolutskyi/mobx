import { FC, useEffect } from 'react';
import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { UsersStore } from 'store/users';
import { UsersHeader } from 'components/Users/Header';
import { UsersTable } from 'components/Users/Table';

export const UsersPage: FC = observer(() => {
	console.log('page render');

	useEffect(() => {
		UsersStore.getAllTest();
	}, []);

	return (
		<Box>
			<UsersHeader />
			<UsersTable />
		</Box>
	);
});
