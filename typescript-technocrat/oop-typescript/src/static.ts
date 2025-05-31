{
  // static

  class Counter {
    static count: number = 0;

    static increment() {
      return Counter.count++;
    }

    static decrement() {
      return Counter.count--;
    }
  }

  const instance1 = new Counter();
  console.log(Counter.increment());
  console.log(Counter.increment());
  console.log(Counter.increment());
  console.log(Counter.increment());

  const instance2 = new Counter();
  console.log(Counter.increment());
  console.log(Counter.decrement());
  console.log(Counter.decrement());

  //
}
