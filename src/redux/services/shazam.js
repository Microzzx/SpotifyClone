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
    // getArtistDetails: builder.query({
    //   query: ({ songid }) => `/artist_overview?id=${songid}`,
    // }),
  }),
});

export const { useGetTopChartsQuery } = shazamApi;
