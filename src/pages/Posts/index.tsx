import { FC, useEffect } from 'react';
import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { PostsStore } from 'store/posts';
import { PostsTable } from 'components/Posts/Table';

export const PostsPage: FC = observer(() => {
	console.log('page render');

	useEffect(() => {
		if (!PostsStore.all.list.length) {
			PostsStore.getAll();
		}
		// PostsStore.getAll();

		// setTimeout(() => {
		// 	PostsStore.getAll();
		// }, 2000);
	}, []);

	return (
		<Box>
			<PostsTable />
		</Box>
	);
});
