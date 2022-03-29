import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsApiHeaders = {
	'X-BingApis-SDK': 'true',
	'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
	'X-RapidAPI-Key': '14a2804083mshfa28a303c339925p173018jsna1b37a4bf44a',
};

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

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
