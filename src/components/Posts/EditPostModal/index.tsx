import { FC, useMemo } from 'react';
import { Button, CircularProgress, Dialog, DialogContent, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { PostsStore } from 'store/posts';
import { DefaultModalProps, IPostRequest } from 'types';

interface EditPostModalProps extends DefaultModalProps {
	onSubmit: (data: IPostRequest) => void;
}

export const EditPostModal: FC<EditPostModalProps> = observer(({ onSubmit, isOpen, onClose }) => {
	const isLoadingButton = useMemo(() => PostsStore.current.isLoading, [PostsStore.current.isLoading]);

	return (
		<Dialog open={isOpen} onClose={onClose}>
			<DialogContent sx={{ padding: '40px 48px' }}>
				<Typography variant="h5" sx={{ mb: '20px' }}>
					{(PostsStore.current.data as IPostRequest)?.id ? 'Edit post' : 'Create post'}
				</Typography>
				<Formik initialValues={PostsStore.current.data} onSubmit={onSubmit}>
					{({ values }) => (
						<Form style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
							<Field name="userId" label="User" placeholder="User" value={values.userId} type="number" />
							<Field name="title" label="Title" placeholder="Title" value={values.title} />
							<Field name="body" label="Boby" placeholder="Boby" value={values.body} />
							<Button
								variant="contained"
								type="submit"
								endIcon={isLoadingButton && <CircularProgress sx={{ color: '#fff' }} size={15} />}
								disabled={isLoadingButton}
							>
								Submit
							</Button>
						</Form>
					)}
				</Formik>
			</DialogContent>
		</Dialog>
	);
});
