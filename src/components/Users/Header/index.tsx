import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Box, Button, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { PostsStore } from 'store/posts';
import { UsersStore } from 'store/users';
import { IUserRequest } from 'types';
import { useModal } from 'components/hooks/use-modal';
import { EditUserModal } from '../EditUserModal';

export const UsersHeader: FC = observer(() => {
	console.log('users header render');
	const [isOpen, handleOpen, handleClose] = useModal();

	const navigate = useNavigate();

	const handleCreateUser = async (payload: IUserRequest): Promise<void> => {
		await UsersStore.createUser(payload);
		handleClose();
	};

	const handleDownloadPosts = async (): Promise<void> => {
		await PostsStore.getAll();
	};

	return (
		<Box sx={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
			<Typography variant="h4">Registered users count: {UsersStore.usersCount}</Typography>
			<Button onClick={handleOpen} disabled={UsersStore.all.isLoading || UsersStore.current.isLoading}>
				Add user
			</Button>
			<EditUserModal onSubmit={handleCreateUser} isOpen={isOpen} onClose={handleClose} />
			<Button onClick={handleDownloadPosts} disabled={PostsStore.all.isLoading}>
				Download Posts
			</Button>
			<Button onClick={() => navigate('/posts')}>Go to posts page</Button>
		</Box>
	);
});
