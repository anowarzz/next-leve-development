import { useState } from "react";

function AsyncIncrement() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const asyncIncrement = () => {
    setTimeout(() => {
      setCount((prevCount) => prevCount + 1);
    }, 3000);
  };

  return (
    <div>
      <p>Count: {count} </p>
      <button onClick={increment}>Increment</button>
      <button onClick={asyncIncrement}>Increment After 3 Seconds</button>
    </div>
  );
}

export default AsyncIncrement;
