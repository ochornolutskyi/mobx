import { FC } from 'react';
import { Button, TableCell, TableRow } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { PostsStore } from 'store/posts';
import { UsersStore } from 'store/users';
import { IUserRequest, IUserResponse } from 'types';
import { useModal } from 'components/hooks/use-modal';
import { EditUserModal } from 'components/Users/EditUserModal';

interface UserItemProps {
	data: IUserResponse;
}

// TODO: should add posts count if we added observer
export const UserItem: FC<UserItemProps> = ({ data }) => {
	console.log('user item ', data.id);

	const [isOpen, handleOpen, handleClose] = useModal();

	const handleUpdateUser = async (payload: IUserRequest): Promise<void> => {
		await UsersStore.updateUser(payload);
		handleClose();
	};

	const handleClickEdit = (): void => {
		UsersStore.setCurrentUser(data);
		handleOpen();
	};

	return (
		<TableRow key={data.id}>
			<TableCell>{data.name}</TableCell>
			<TableCell>{data.username}</TableCell>
			<TableCell>{data.email}</TableCell>
			<TableCell>{data.phone}</TableCell>
			<TableCell>{data.website}</TableCell>
			<TableCell>{PostsStore.postsCountByUser(data.id)}</TableCell>
			<TableCell>
				<Button onClick={handleClickEdit} disabled={UsersStore.all.isLoading || UsersStore.current.isLoading}>
					Edit
				</Button>
				<EditUserModal isOpen={isOpen} onSubmit={handleUpdateUser} />
				<Button
					onClick={() => UsersStore.deleteUser(data.id)}
					disabled={UsersStore.all.isLoading || UsersStore.current.isLoading}
				>
					Delete
				</Button>
			</TableCell>
		</TableRow>
	);
};
