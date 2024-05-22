import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_URL;

const baseQuery = fetchBaseQuery({ baseUrl });

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery,
  endpoints: () => ({}),
});
