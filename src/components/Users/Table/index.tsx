import { FC } from 'react';
import { Backdrop, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { TodosStore } from 'store/todos';
import { UsersStore } from 'store/users';
import { IUserResponse } from 'types';
import { Dumb } from './Dumb';
import { UserItem } from './UserItem';

export const UsersTable: FC = observer(() => {
	console.log('render table');

	return (
		<>
			<Dumb />
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Username</TableCell>
						<TableCell>Email</TableCell>
						<TableCell>Phone</TableCell>
						<TableCell>Website</TableCell>
						<TableCell>Posts count</TableCell>
						<TableCell />
					</TableRow>
				</TableHead>
				<TableBody>
					{UsersStore.all.list.map((item: IUserResponse) => (
						<UserItem key={item.id} data={item} />
					))}
				</TableBody>
			</Table>
			<Backdrop
				sx={{ backgroundColor: 'rgba(200, 200, 200, 0.5)' }}
				open={UsersStore.all.isLoading || TodosStore.all.isLoading}
			>
				<CircularProgress />
			</Backdrop>
		</>
	);
});
