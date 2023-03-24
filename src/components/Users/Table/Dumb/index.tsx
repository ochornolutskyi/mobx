import { FC } from 'react';
import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';

// TODO: uncomment to show rerenders
export const Dumb: FC = observer(() => {
	console.log('i am dumb component render');

	return <Box>Dumb component</Box>;
});
