import { useState } from 'react';

export const useModal = (openDefault = false): [boolean, () => void, () => void] => {
	const [isOpen, setIsOpen] = useState<boolean>(openDefault);

	const handleOpen = (): void => setIsOpen(true);
	const handleClose = (): void => setIsOpen(false);

	return [isOpen, handleOpen, handleClose];
};
