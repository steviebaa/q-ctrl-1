import { Card, CardProps, Grid } from '@mui/material';
import { GridProps, styled } from '@mui/system';
import { ResponseCountry } from '../../interfaces/rest-countries';

const StyledGridRow = styled((props: GridProps) => <Grid item {...props} />)({
	marginBottom: '0.2rem',
});

const StyledCard = styled((props: CardProps) => (
	<Card variant='outlined' {...props} />
))(({ theme }) => ({
	padding: theme.spacing(2),
	cursor: 'pointer',
	'&:hover': {
		borderColor: '#448aff',
		transform: 'scale(1.01)',
		transition: '.1s ease-in-out',
	},
}));

interface ICountryTableRow {
	data: ResponseCountry;
	handleClick(name: string): any;
}

export const CountryTableRow = (props: ICountryTableRow) => {
	// Handle row click
	const handleClick = () => {
		if (props.handleClick) {
			props.handleClick(props.data.name);
		}
	};

	return (
		<StyledGridRow>
			<StyledCard onClick={handleClick}>{props.data.name}</StyledCard>
		</StyledGridRow>
	);
};
