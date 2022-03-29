import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
	'x-access-token':
		'coinrankingcadf9d4cdb7f986649e6629f23158291639548d48bead2ac',
};

const baseUrl = 'http://localhost:8001/api';

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
	reducerPath: 'cryptoApi',
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		getCryptos: builder.query({
			query: (count) => createRequest(`/coins?limit=${count}`),
		}),
		getExchanges: builder.query({
			query: () => createRequest(`/exchanges`),
		}),
		getCryptoDetails: builder.query({
			query: (coinUuid) => createRequest(`/coin/${coinUuid}`),
		}),
		getCryptoHistory: builder.query({
			query: ({ coinUuid, timePeriod }) =>
				createRequest(`coin/${coinUuid}/history?timePeriod=${timePeriod}`),
		}),
	}),
});

export const {
	useGetCryptosQuery,
	useGetExchangesQuery,
	useGetCryptoDetailsQuery,
	useGetCryptoHistoryQuery,
} = cryptoApi;

export type CryptoLinkType = {
	name: string;
	type: string;
	url: string;
};

export type CurrencyType = {
	uuid: string;
	rank: string;
	name: string;
	iconUrl: string;
	marketCap: number;
	price: number;
	change: number;
};

export type ExchangeType = {
	uuid: string;
	rank: string;
	iconUrl: string;
	name: string;
	volume: number;
	numberOfMarkets: number;
	marketShare: number;
	description: string;
};
