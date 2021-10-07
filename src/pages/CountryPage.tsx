import { ResponseCountry } from '../interfaces/rest-countries';
import { Button, Container, Grid, Typography } from '@mui/material';
import { useHistory } from 'react-router';
import { StyledH3 } from '../components/styled/typography';

interface ICountryPage {
	countries: ResponseCountry[];
	activeCountry: string;
}

export const CountryPage = (props: ICountryPage & JSX.IntrinsicAttributes) => {
	// Routing
	const history = useHistory();
	const navigateHome = () => {
		return history.push('/');
	};

	// Go to search page if fetch hasnt been called
	if (!props.countries.length) {
		navigateHome();
		return null;
	}

	// Get detailed country data
	const countryData = props.countries.filter(
		(country) => country.name === props.activeCountry
	)[0];

	return (
		<main>
			<Container maxWidth='sm'>
				<Grid direction='column' textAlign='center'>
					<br />
					<Button fullWidth onClick={navigateHome} variant='outlined'>
						Back
					</Button>

					<StyledH3>{props.activeCountry}</StyledH3>
					<img
						width='200px'
						alt='country-flag'
						src={countryData.flag}
						style={{
							// Some shadow for flags with white edges like algeria
							boxShadow: '0px 0px 3px',
							borderRadius: '4px',
						}}
					/>

					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Typography>
								<strong>Population</strong>
							</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography>{countryData.population}</Typography>
						</Grid>
					</Grid>

					<br />

					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Typography>
								<strong>Demonym</strong>
							</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography>{countryData.demonym}</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</main>
	);
};
