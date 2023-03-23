import { FC } from 'react';
import { Box } from '@mui/material';

export const Dumb: FC = () => {
	console.log('i am dumb component render');

	return <Box>Dumb component</Box>;
};
