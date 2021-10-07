import React from 'react';
import {
	CircularProgress,
	Container,
	Grid,
	Snackbar,
	TextField,
	Typography,
} from '@mui/material';
import { StyledH1 } from '../components/styled/typography';
import { StyledButton } from '../components/styled/buttons';
import { CountryTable } from '../components/data-display/CountryTable';
import { EndpointUtility } from '../utilities/EndpointUtility';
import { ResponseCountry } from '../interfaces/rest-countries';
import { useHistory } from 'react-router';

interface ICountriesPage {
	setCountries(countries: ResponseCountry[]): any;
	setActiveCountry(country: string): any;
	countries: ResponseCountry[];
}

export const CountriesPage = ({
	setCountries,
	setActiveCountry,
	countries,
}: ICountriesPage & JSX.IntrinsicAttributes) => {
	// Search
	const [searchTerm, setSearchTerm] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);

	// Snackbar
	const [snackbarOpen, setSnackbarOpen] = React.useState(false);
	const [snackbarMessage, setSnackbarMessage] = React.useState('');

	// Routing
	const history = useHistory();

	// Handlers
	const handleCloseSnackbar = () => setSnackbarOpen(false);

	const handleSearchChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleSearchClicked = async (e: React.FormEvent<HTMLElement>) => {
		e.preventDefault();

		// Check input is provided
		if (!searchTerm.length) {
			setSnackbarMessage('✏️ Please enter a search word.');
			setSnackbarOpen(true);
			return;
		}

		// Set country state to empty
		setCountries([]);

		// Disable components and show spinner
		setIsLoading(true);

		const response = await EndpointUtility.fetchByPartialName(searchTerm)
			.catch((e) => {
				// Notify user
				setSnackbarMessage('🚨 Something went wrong, try again soon.');
				setSnackbarOpen(true);
			})
			.finally(() => {
				// Enable components and show spinner
				setIsLoading(false);
			});

		if (Array.isArray(response)) {
			// sort response
			const sorted = response.sort((a, b) =>
				a.name.localeCompare(b.name)
			);
			setCountries(sorted);
		}
	};

	const handleRowClick = (countryName: string) => {
		setActiveCountry(countryName);
		history.push('/country');
	};

	return (
		<main>
			<Container maxWidth='sm'>
				<StyledH1>Countries</StyledH1>
				<form onSubmit={handleSearchClicked}>
					<Grid container spacing={2}>
						<Grid item xs={8}>
							<TextField
								disabled={isLoading}
								fullWidth
								variant='outlined'
								placeholder='Country Name'
								value={searchTerm}
								onChange={handleSearchChanged}
							/>
						</Grid>
						<Grid item xs={4}>
							<StyledButton
								disabled={isLoading}
								variant='contained'
								disableElevation
								type='submit'
							>
								{isLoading ? (
									<CircularProgress />
								) : (
									<Typography>Search</Typography>
								)}
							</StyledButton>
						</Grid>
					</Grid>
				</form>

				<CountryTable
					countries={countries}
					onRowClick={handleRowClick}
				/>
			</Container>

			{/* User feedback */}
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={4000}
				onClose={handleCloseSnackbar}
				message={snackbarMessage}
			/>
		</main>
	);
};
