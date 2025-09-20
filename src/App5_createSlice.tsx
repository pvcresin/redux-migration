import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore, combineReducers } from "redux";

// slice
type CounterState = { value: number };

const initialState: CounterState = { value: 0 };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

const { add } = counterSlice.actions;
const counterReducer = counterSlice.reducer;

// store
const reducer = combineReducers({
  counter: counterReducer,
});

const store = createStore(reducer);

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

export const App = () => (
  <Provider store={store}>
    <Counter />
  </Provider>
);
