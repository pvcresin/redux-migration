import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// api
type Person = { name: string };

const baseUrl = "https://swapi.dev/api/";

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getPerson: build.query<Person, number>({
      query: (id) => `people/${id}/`,
    }),
  }),
});

const apiReducer = api.reducer;
const { useGetPersonQuery } = api;

// store
const store = configureStore({
  reducer: {
    api: apiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// component
const PersonName = () => {
  const { data, isLoading, error } = useGetPersonQuery(1);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return <p>{data?.name}</p>;
};

export const App = () => {
  return (
    <Provider store={store}>
      <PersonName />
    </Provider>
  );
};
