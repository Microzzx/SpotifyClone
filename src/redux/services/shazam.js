import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Sidebar } from "../../components";

export const shazamApi = createApi({
  reducerPath: "shazamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", import.meta.env.VITE_RAPIDAPI_KEY);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => `/charts/track`,
    }),
    getSongDetails: builder.query({
      query: ({ songid }) => `/songs/v2/get-details?id=${songid}`,
    }),
    getTopSongs: builder.query({
      query: ({ artistId }) => `/artists/get-top-songs?id=${artistId}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetTopSongsQuery,
} = shazamApi;
