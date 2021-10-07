import { styled } from '@mui/system';
import { Typography } from '@mui/material';

export const StyledH1 = styled((props) => (
	<Typography variant='h1' {...props} />
))({
	fontWeight: 500,
	fontSize: '5rem',
});

export const StyledH3 = styled((props) => (
	<Typography variant='h3' {...props} />
))({
	fontWeight: 500,
	fontSize: '3rem',
	marginTop: '1rem',
});
