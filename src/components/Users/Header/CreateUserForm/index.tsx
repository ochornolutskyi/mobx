import { FC, useState } from 'react';
import { Button, CircularProgress, Dialog, DialogContent, OutlinedInput, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { UsersStore } from 'store/users';
import { IUser } from 'types/users';

const Component: FC = () => {
	const [isOpenDialog, setIsOpenDialog] = useState(false);

	const handleSubmit = async (values: IUser): Promise<void> => {
		await UsersStore.createUser(values);
		setIsOpenDialog(false);
	};

	console.log('file: index.tsx:18  UsersStore:', UsersStore);

	return (
		<>
			<Button onClick={() => setIsOpenDialog(true)}>Add user</Button>
			<span>{UsersStore.create.isLoading}</span>

			<Dialog open={isOpenDialog} onClose={() => setIsOpenDialog(false)}>
				<DialogContent sx={{ padding: '40px 48px' }}>
					<Typography variant="h5" sx={{ mb: '20px' }}>
						Create user
					</Typography>
					<Formik initialValues={UsersStore.create.data} onSubmit={handleSubmit}>
						{({ values }) => (
							<Form style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
								<Field
									name="username"
									label="Username"
									placeholder="Username"
									component={OutlinedInput}
									value={values.username}
								/>
								<Field name="name" label="Name" placeholder="Name" component={OutlinedInput} value={values.name} />
								<Field name="email" label="Email" placeholder="Email" component={OutlinedInput} value={values.email} />
								<Field name="phone" label="Phone" placeholder="Phone" component={OutlinedInput} value={values.phone} />
								<Field
									name="website"
									label="Website"
									placeholder="Website"
									component={OutlinedInput}
									value={values.website}
								/>

								<Button
									variant="contained"
									type="submit"
									endIcon={UsersStore.create.isLoading && <CircularProgress sx={{ color: '#fff' }} size={15} />}
								>
									Submit
								</Button>
							</Form>
						)}
					</Formik>
				</DialogContent>
			</Dialog>
		</>
	);
};

export const CreateUserForm = observer(Component);
