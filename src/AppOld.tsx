import { Component } from "react";
import { Provider, connect } from "react-redux";
import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
  Action,
  bindActionCreators,
  Dispatch,
} from "redux";
import { thunk } from "redux-thunk";

const DECREMENT = "DECREMENT" as const;
const INCREMENT = "INCREMENT" as const;

const actions = {
  increment: () => ({ type: INCREMENT }),
  decrement: () => ({ type: DECREMENT }),
};

type CounterState = { value: number };

const initialState: CounterState = { value: 0 };

function counterReducer(state = initialState, action: Action) {
  switch (action.type) {
    case INCREMENT: {
      return { ...state, value: state.value + 1 };
    }
    case DECREMENT: {
      return { ...state, value: state.value - 1 };
    }
    default:
      return state;
  }
}

type RootState = {
  counter: CounterState;
};

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

class Counter extends Component<{ count: number } & typeof actions> {
  render() {
    const { count, increment, decrement } = this.props;

    return (
      <div>
        <button onClick={() => decrement()}>-</button>
        <span>{count}</span>
        <button onClick={() => increment()}>+</button>
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return { count: state.counter.value };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(actions, dispatch);
}

const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default function App() {
  return (
    <Provider store={store}>
      <ConnectedCounter />
    </Provider>
  );
}
