import { Grid, Typography } from '@mui/material';
import React from 'react';
import { ResponseCountry } from '../../interfaces/rest-countries';
import { CountryTableRow } from './CountryTableRow';
import { StyledButton } from '../styled/buttons';

export interface CountryTableProps {
	countries: ResponseCountry[];
	onRowClick(countryName: string): any;
}

export const CountryTable = ({ countries, onRowClick }: CountryTableProps) => {
	// Page
	const [page, setPage] = React.useState(1);

	// Reset page when countries change
	React.useEffect(() => {
		setPage(1);
	}, [countries]);

	const handleRowClick = (countryName: string) => {
		onRowClick(countryName);
	};

	// Create pagination groups
	const pageGroups: { [group: string]: ResponseCountry[] } = {};
	if (countries.length) {
		for (let i = 0; i <= countries.length - 1; i++) {
			const group = Math.ceil((i + 1) / 10);

			if (!pageGroups[group]) {
				pageGroups[group] = [];
			}

			pageGroups[group.toString()].push(countries[i]);
		}
	}

	// Conditional rendering booleans
	const pageCount = Object.keys(pageGroups).length;
	const showCountries = pageCount ? pageGroups[page] : [];
	const showLastButton = page !== 1 && countries.length;
	const showNextButton = page !== pageCount && countries.length;

	return (
		<React.Fragment>
			<br />
			<Grid container direction='column'>
				{showCountries.map((row) => (
					<CountryTableRow
						key={row.name}
						data={row}
						handleClick={handleRowClick}
					/>
				))}
			</Grid>
			<br />

			{pageCount ? (
				<Typography variant='overline'>{`Page: ${page}/${pageCount}`}</Typography>
			) : null}

			{/* PAGINATION */}
			<Grid container spacing={2}>
				{/* LAST BUTTON */}
				{showLastButton ? (
					<Grid item xs={showNextButton ? 6 : 12}>
						<StyledButton
							onClick={() => setPage(page - 1)}
							variant='outlined'
						>
							Last
						</StyledButton>
					</Grid>
				) : null}

				{/* NEXT BUTTON */}
				{showNextButton ? (
					<Grid item xs={showLastButton ? 6 : 12}>
						<StyledButton
							onClick={() => setPage(page + 1)}
							variant='outlined'
						>
							Next
						</StyledButton>
					</Grid>
				) : null}
			</Grid>
		</React.Fragment>
	);
};
