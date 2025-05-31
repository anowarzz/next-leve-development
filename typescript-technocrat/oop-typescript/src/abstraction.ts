{
  // oop - abstraction in two way => 1. interface 2. abstract class

  //  idea here using interface
  interface Vehicle1 {
    startEngine(): void;
    stopEngine(): void;
    move(): void;
  }
  // real implementation here
  class Car1 implements Vehicle1 {
    startEngine(): void {
      console.log("Engine started");
    }
    stopEngine(): void {
      console.log("Engine stopped");
    }
    move(): void {
      console.log("Car is moving");
    }
    test() {
      console.log("testing the car");
    }
  }
  const toyotaCar = new Car1();
  toyotaCar.test();

  //  ==> Using abstract class

  abstract class Car2 {
    abstract startEngine(): void;
    abstract stopEngine(): void;
    abstract move(): void;
    test() {
      console.log("i am testing the car");
    }
  }

  class ToyotaCar extends Car2 {
    startEngine(): void {
      console.log("Toyota engine started");
    }

    stopEngine(): void {
      console.log("Toyota engine stopped");
    }

    move(): void {
      console.log("Toyota car is moving");
    }
  }

  const toyotaCar2 = new ToyotaCar();
  toyotaCar2.move();

  //
}
