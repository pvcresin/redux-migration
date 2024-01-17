import { increment, decrement } from "./counterSlice";
import { useAppDispatch, useAppSelector } from "./store";

function App() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <>
      <button onClick={() => dispatch(decrement())}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
    </>
  );
}

export default App;
