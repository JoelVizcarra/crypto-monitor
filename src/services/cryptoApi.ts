import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = `${process.env.REACT_APP_API_URL}/crypto`;

export const cryptoApi = createApi({
	reducerPath: 'cryptoApi',
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		getCryptos: builder.query({
			query: (count) => ({ url: `/coins?limit=${count}` }),
		}),
		getExchanges: builder.query({
			query: () => ({ url: `/exchanges` }),
		}),
		getCryptoDetails: builder.query({
			query: (coinUuid) => ({ url: `/coin/${coinUuid}` }),
		}),
		getCryptoHistory: builder.query({
			query: ({ coinUuid, timePeriod }) => ({
				url: `coin/${coinUuid}/history?timePeriod=${timePeriod}`,
			}),
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
