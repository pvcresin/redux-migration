import { useDispatch, useSelector, Provider } from "react-redux";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

// slice
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

const { add } = counterSlice.actions;
const counterReducer = counterSlice.reducer;

// store
const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

type RootState = ReturnType<typeof store.getState>;

// component
const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch(add(1))}>+1</button>
      <button onClick={() => dispatch(add(5))}>+5</button>
    </div>
  );
};

export const App = () => {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
};
