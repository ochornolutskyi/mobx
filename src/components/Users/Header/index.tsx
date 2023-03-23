import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { UsersStore } from 'store/users';
import { CreateUserForm } from './CreateUserForm';

const Component: FC = () => {
	console.log('users header render');

	return (
		<Box sx={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
			<Typography variant="h4">Registered users count: {UsersStore.usersCount}</Typography>
			<CreateUserForm />
		</Box>
	);
};

export const UsersHeader = observer(Component);
