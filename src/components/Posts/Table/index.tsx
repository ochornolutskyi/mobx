import { FC } from 'react';
import { Backdrop, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { PostsStore } from 'store/posts';
import { IPostResponse } from 'types';
import { PostItem } from './PostItem';

export const PostsTable: FC = observer(() => (
	<>
		<Table>
			<TableHead>
				<TableRow>
					<TableCell>UserId</TableCell>
					<TableCell>Title</TableCell>
					<TableCell>Body</TableCell>
					<TableCell />
				</TableRow>
			</TableHead>
			<TableBody>
				{PostsStore.all.list.map((item: IPostResponse) => (
					<PostItem key={item.id} data={item} />
				))}
			</TableBody>
		</Table>
		<Backdrop sx={{ backgroundColor: 'rgba(200, 200, 200, 0.5)' }} open={PostsStore.all.isLoading}>
			<CircularProgress />
		</Backdrop>
	</>
));
