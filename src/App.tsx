import { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Pages
import { CountriesPage } from './pages/CountriesPage';
import { CountryPage } from './pages/CountryPage';

// Interfaces
import { ResponseCountry } from './interfaces/rest-countries';

interface AppProps {}

interface AppState {
	countries: ResponseCountry[];
	activeCountry: string;
}

class App extends Component<AppProps, AppState> {
	state = {
		countries: [],
		activeCountry: '',
	};

	setCountries = (countries: ResponseCountry[]) => {
		this.setState({ countries });
	};

	setActiveCountry = (countryName: string) => {
		this.setState({ activeCountry: countryName });
	};

	render() {
		return (
			<Router>
				<Switch>
					<Route path='/country'>
						<CountryPage
							countries={this.state.countries}
							activeCountry={this.state.activeCountry}
						/>
					</Route>
					<Route path='/'>
						<CountriesPage
							setCountries={this.setCountries}
							setActiveCountry={this.setActiveCountry}
							countries={this.state.countries}
						/>
					</Route>
				</Switch>
			</Router>
		);
	}
}

export default App;
