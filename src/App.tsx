import { useDispatch, useSelector, Provider } from "react-redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

const {
  actions: { increment, decrement },
  reducer: counterReducer,
} = counterSlice;

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

const { dispatch, getState } = store;

type AppDispatch = typeof dispatch;

type RootState = ReturnType<typeof getState>;

const useAppDispatch = useDispatch.withTypes<AppDispatch>();

const useAppSelector = useSelector.withTypes<RootState>();

function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <button onClick={() => dispatch(decrement())}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
