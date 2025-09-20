import { useDispatch, useSelector, Provider } from "react-redux";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { create } from "zustand";
import { atom, useAtom } from "jotai";

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

const store = configureStore({ reducer: { counter: counterSlice.reducer } });

type RootState = ReturnType<typeof store.getState>;

// Redux
const useCounterStoreRedux = () => {
  const count = useSelector((state: RootState) => state.counter.value);

  const dispatch = useDispatch();

  const add = (n: number) => dispatch(counterSlice.actions.add(n));

  return { count, add };
};

const ReduxCounter = () => {
  const { count, add } = useCounterStoreRedux();

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => add(1)}>+1</button>
      <button onClick={() => add(5)}>+5</button>
    </div>
  );
};

// Zustand
type CounterState = {
  count: number;
  add: (n: number) => void;
};

const useCounterStoreZustand = create<CounterState>((set) => ({
  count: 0,
  add: (n) => set((state) => ({ count: state.count + n })),
}));

const ZustandCounter = () => {
  const { count, add } = useCounterStoreZustand();

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => add(1)}>+1</button>
      <button onClick={() => add(5)}>+5</button>
    </div>
  );
};

// Jotai
const countAtom = atom(0);

const JotaiCounter = () => {
  const [count, setCount] = useAtom(countAtom);

  const add = (n: number) => setCount((prev) => prev + n);

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => add(1)}>+1</button>
      <button onClick={() => add(5)}>+5</button>
    </div>
  );
};

const useCounterStore = () => {
  const redux = useCounterStoreRedux();
  const zustand = useCounterStoreZustand();

  console.log(redux.count === zustand.count);

  const count = redux.count;

  const add = (n: number) => {
    redux.add(n);
    zustand.add(n);
  };

  return { count, add };
};

const ReduxZustandCounter = () => {
  const { count, add } = useCounterStore();

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => add(1)}>+1</button>
      <button onClick={() => add(5)}>+5</button>
    </div>
  );
};

export const App = () => {
  return (
    <Provider store={store}>
      Redux Toolkit
      <ReduxCounter />
      Zustand
      <ZustandCounter />
      Jotai
      <JotaiCounter />
      ReduxZustand
      <ReduxZustandCounter />
    </Provider>
  );
};
