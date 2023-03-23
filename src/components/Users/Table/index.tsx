import { FC } from 'react';
import { Backdrop, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { UsersStore } from 'store/users';
import { IUser } from 'types/users';

const Component: FC = () => {
	console.log('render table');

	return (
		<>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell />
					</TableRow>
				</TableHead>
				<TableBody>
					{UsersStore.all.list.map((item: IUser) => (
						<TableRow key={item.id}>
							<TableCell>{item.name}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Backdrop sx={{ backgroundColor: 'rgba(200, 200, 200, 0.5)' }} open={UsersStore.all.isLoading}>
				<CircularProgress />
			</Backdrop>
		</>
	);
};

export const UsersTable = observer(Component);
