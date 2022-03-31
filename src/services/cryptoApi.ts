import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
	'x-access-token': process.env.REACT_APP_CRYPTO_API_X_ACCESS_TOKEN,
};

const baseUrl = process.env.REACT_APP_CRYPTO_API_URL;

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
