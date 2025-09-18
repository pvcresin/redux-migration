import { useDispatch, useSelector, Provider } from "react-redux";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

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

const {
  actions: { add },
  reducer: counterReducer,
} = counterSlice;

// store
const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

const useAppSelector = useSelector.withTypes<RootState>();

// component
function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch(add(1))}>+1</button>
      <button onClick={() => dispatch(add(5))}>+5</button>
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
