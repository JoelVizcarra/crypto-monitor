import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsApiHeaders = {
	'X-BingApis-SDK': 'true',
	'X-RapidAPI-Host': process.env.REACT_APP_NEWS_XRAPIDAPI_HOST,
	'X-RapidAPI-Key': process.env.REACT_APP_NEWS_XRAPIDAPI_KEY,
};

const baseUrl = process.env.REACT_APP_NEWS_API_URL;

const createRequest = (url: string) => ({ url, headers: cryptoNewsApiHeaders });

export const cryptoNewsApi = createApi({
	reducerPath: 'cryptoNewsApi',
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		getCryptoNews: builder.query({
			query: ({ category, count }) =>
				createRequest(
					`/news/search?q=${category}&count=${count}&freshness=Day&textFormat=Raw&safeSearch=Off`
				),
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
