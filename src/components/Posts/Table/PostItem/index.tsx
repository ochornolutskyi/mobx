import { FC } from 'react';
import { Button, TableCell, TableRow } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { PostsStore } from 'store/posts';
import { UsersStore } from 'store/users';
import { IPostRequest, IPostResponse, IUserRequest, IUserResponse } from 'types';
import { useModal } from 'components/hooks/use-modal';
import { EditPostModal } from 'components/Posts/EditPostModal';

interface PostItemProps {
	data: IPostResponse;
}

export const PostItem: FC<PostItemProps> = ({ data }) => {
	const [isOpen, handleOpen, handleClose] = useModal();

	const handleUpdatePost = async (payload: IPostRequest): Promise<void> => {
		await PostsStore.updatePost(payload);
		handleClose();
	};

	const handleClickEdit = (): void => {
		PostsStore.setCurrentPost(data);
		handleOpen();
	};

	return (
		<TableRow>
			<TableCell>{UsersStore.all.list.find(item => item.id === data.userId)?.name}</TableCell>
			<TableCell>{data.title}</TableCell>
			<TableCell>{data.body}</TableCell>
			<TableCell>
				<Button onClick={handleClickEdit} disabled={UsersStore.all.isLoading || UsersStore.current.isLoading}>
					Edit
				</Button>
				<EditPostModal isOpen={isOpen} onSubmit={handleUpdatePost} />
				<Button
					onClick={() => PostsStore.deletePost(data.id)}
					disabled={UsersStore.all.isLoading || UsersStore.current.isLoading}
				>
					Delete
				</Button>
			</TableCell>
		</TableRow>
	);
};
