{
  // polimorphism

  class Person {
    getSleep() {
      console.log(`I am sleeping for 8 hours per day`);
    }
  }
  class Student extends Person {
    getSleep() {
      console.log(`I am sleeping for 7 hours per day`);
    }
  }
  class Developer extends Person {
    getSleep() {
      console.log(`I am sleeping for 6 hours per day`);
    }
  }

  const getSleepingHours = (param: Person) => {
    param.getSleep();
  };

  const person1 = new Person();
  const student1 = new Student();
  const developer1 = new Developer();

  getSleepingHours(student1);
  getSleepingHours(developer1);
  getSleepingHours(person1);

  //  ==> Another example
  class Shape {
    getArea(): number {
      return 0;
    }
  }

  // circle area
  class Circle extends Shape {
    radius: number;
    constructor(radius: number) {
      super();
      this.radius = radius;
    }

    getArea(): number {
      return Math.PI * this.radius * this.radius;
    }
  }

  // reactangle area
  class Rectangle extends Shape {
    height: number;
    width: number;
    constructor(height: number, width: number) {
      super();
      this.height = height;
      this.width = width;
    }

    getArea(): number {
      return this.height * this.width;
    }
  }

  const getShapeArea = (param: Shape) => {
    console.log(param.getArea());
  };

  const shape1 = new Shape();
  const shape2 = new Circle(5);
  const shape3 = new Rectangle(10, 20);

  getShapeArea(shape1);
  getShapeArea(shape2);
  getShapeArea(shape3);
  console.log("Shapes area calculated successfully.");

  //
}
