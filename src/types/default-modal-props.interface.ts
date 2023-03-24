import { DialogProps } from '@mui/material';

export interface DefaultModalProps extends Pick<DialogProps, 'onClose'> {
	isOpen: boolean;
}
