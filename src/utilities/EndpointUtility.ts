import axios from 'axios';
import { ResponseCountry } from '../interfaces/rest-countries';

export class EndpointUtility {
	static baseUrl = 'https://restcountries.com/v2/name';

	static async fetchByPartialName(
		searchTerm: string
	): Promise<ResponseCountry[]> {
		// v3 404's for search of "aus" - using v2 instead
		const endpoint = `${this.baseUrl}/${searchTerm}`;
		const response = await axios.get<ResponseCountry[]>(endpoint);

		return response.data;
	}
}
