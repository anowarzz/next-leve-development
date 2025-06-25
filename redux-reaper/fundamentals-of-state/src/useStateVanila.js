const React = (() => {
  let state = [];

  let index = 0;

  const useState = (initialValue) => {
    let hookIndex = index;
    index++;

    if (state[hookIndex] === undefined) {
      state[hookIndex] = initialValue;
    }

    const setter = (newState) => {
      state[hookIndex] = newState;
    };

    return [state[hookIndex], setter];
  };

  const resetIndex = () => {
    index = 0;
  };

  return {
    useState,
    resetIndex,
  };
})();

const { useState, resetIndex } = React;

const Component = () => {
  const [count, setCount] = useState(1);
  const [name, setName] = useState("Programming");

  console.log(count);
  console.log(name);

  setCount(2);
  setName("Hero");
};

Component();
resetIndex();
Component();
