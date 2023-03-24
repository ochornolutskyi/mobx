import { FC, useMemo } from 'react';
import { Button, CircularProgress, Dialog, DialogContent, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { UsersStore } from 'store/users';
import { DefaultModalProps, IUserRequest, IUserResponse } from 'types';

interface EditUserModalProps extends DefaultModalProps {
	onSubmit: (data: IUserRequest) => void;
}

export const EditUserModal: FC<EditUserModalProps> = observer(({ onSubmit, isOpen, onClose }) => {
	const isLoadingButton = useMemo(() => UsersStore.current.isLoading, [UsersStore.current.isLoading]);

	return (
		<Dialog open={isOpen} onClose={onClose}>
			<DialogContent sx={{ padding: '40px 48px' }}>
				<Typography variant="h5" sx={{ mb: '20px' }}>
					{(UsersStore.current.data as IUserResponse)?.id ? 'Edit user' : 'Create user'}
				</Typography>
				<Formik initialValues={UsersStore.current.data} onSubmit={onSubmit}>
					{({ values }) => (
						<Form style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
							<Field name="username" label="Username" placeholder="Username" value={values.username} />
							<Field name="name" label="Name" placeholder="Name" value={values.name} />
							<Field name="email" label="Email" placeholder="Email" value={values.email} />
							<Field name="phone" label="Phone" placeholder="Phone" value={values.phone} />
							<Field name="website" label="Website" placeholder="Website" value={values.website} />
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
