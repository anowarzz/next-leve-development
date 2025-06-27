import { decrement, increment } from "./redux/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import type { RootState } from "./redux/store";

function App() {
  const dispatch = useAppDispatch();
  const { count } = useAppSelector((state: RootState) => state.counter);

  // const handleIncrement = (amount: number) => {
  //   dispatch(increment(amount));
  // };

  // const handleDecrement = (amount: number) => {
  //   dispatch(decrement(amount));
  // };

  return (
    <>
      <div>
        <h1>Counte with Redux</h1>

        <button onClick={() => dispatch(increment(5))}>Increment By 5</button>
        <button onClick={() => dispatch(increment(1))}>Increment</button>
        <div>{count}</div>
        <button onClick={() => dispatch(decrement(1))}>Decrement</button>
      </div>
    </>
  );
}

export default App;
