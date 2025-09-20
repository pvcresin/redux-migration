import { createAction, createReducer } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { thunk } from "redux-thunk";

// action
const add = createAction<number>("ADD");

// reducer
type CounterState = { value: number };

const initialState: CounterState = { value: 0 };

const counterReducer = createReducer(initialState, (builder) => {
  builder.addCase(add, (state, action) => {
    state.value += action.payload;
  });
});

// store
const reducer = combineReducers({
  counter: counterReducer,
});

interface ExtendedWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}
declare var window: ExtendedWindow;

const composeWithDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

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
