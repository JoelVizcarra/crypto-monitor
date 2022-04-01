import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = `${process.env.REACT_APP_API_URL}/news`;

export const cryptoNewsApi = createApi({
	reducerPath: 'cryptoNewsApi',
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		getCryptoNews: builder.query({
			query: ({ category, count }) => ({
				url: `/news/search?q=${category}&count=${count}&freshness=Day&textFormat=Raw&safeSearch=Off`,
			}),
		}),
	}),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;

export type ApiImageType = {
	thumbnail: { contentUrl: string };
};

export type NewsType = {
	url: string;
	name: string;
	description: string;
	datePublished: number;
	provider: Array<{ name: string; image: ApiImageType }>;
	image: ApiImageType;
};
