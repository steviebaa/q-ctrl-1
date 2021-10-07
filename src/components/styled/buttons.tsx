import { styled } from '@mui/system';
import { Button, ButtonProps } from '@mui/material';

export const StyledButton = styled((props: ButtonProps) => (
	<Button {...props} />
))({
	height: '100%',
	width: '100%',
});
