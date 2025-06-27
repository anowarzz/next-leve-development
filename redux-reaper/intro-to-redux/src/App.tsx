import { decrement, increment } from "./redux/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import type { RootState } from "./redux/store";

function App() {
  const dispatch = useAppDispatch();
  const { count } = useAppSelector((state: RootState) => state.counter);

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <>
      <div>
        <h1>Counte with Redux</h1>

        <button onClick={handleIncrement}>Increment</button>
        <div>{count}</div>
        <button onClick={handleDecrement}>Decrement</button>
      </div>
    </>
  );
}

export default App;
