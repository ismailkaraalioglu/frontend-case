import { api } from "../api";
import { Response } from "@/models/api";
import { Character } from "@/models/character";

export const postsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCharacters: build.query<Response<Character>, { query: string }>({
      query: ({ query }) => ({
        url: "/character/",
        params: { name: query },
      }),
    }),
  }),
});

export const { useGetCharactersQuery } = postsApi;
