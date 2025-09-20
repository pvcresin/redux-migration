import { Provider, useDispatch, useSelector } from "react-redux";
import {
  configureStore,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import { useEffect } from "react";

// api
type Person = { name: string };

const baseUrl = "https://swapi.dev/api/";

const fetchPerson = (id: number): Promise<Person> =>
  fetch(`${baseUrl}people/${id}/`).then((res) => res.json());

// async thunk action
const getPerson = createAsyncThunk("api/getPerson", fetchPerson);

// reducer
type ApiState = {
  data: Person | undefined;
  isLoading: boolean;
  error: unknown;
};

const initialState: ApiState = {
  data: undefined,
  isLoading: false,
  error: undefined,
};

const apiReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getPerson.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    })
    .addCase(getPerson.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    })
    .addCase(getPerson.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
});

// store
const store = configureStore({
  reducer: {
    api: apiReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// component
const PersonName = () => {
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.api
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getPerson(1));
  }, [dispatch]);

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
