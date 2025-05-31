{
  //  oop ---> Inheritence

  // person class => Parent class
  class Person {
    name: string;
    age: number;
    address: string;

    constructor(name: string, age: number, address: string) {
      this.name = name;
      this.age = age;
      this.address = address;
    }

    getSleep(numOfHours: number) {
      console.log(`${this.name} sleeps for ${numOfHours} hours.`);
    }
  }

  // student class

  class Student extends Person {
    constructor(name: string, age: number, address: string) {
      super(name, age, address);
    }
  }

  const student1 = new Student("Harry Potter", 11, "Hogwarts");

  // Teacher class

  class Teacher extends Person {
    designation: string;

    constructor(
      name: string,
      age: number,
      address: string,
      designation: string
    ) {
      super(name, age, address);
      this.designation = designation;
    }

    takeClass(numOfClass: number) {
      console.log(`${this.name} is taking class number ${numOfClass}.`);
    }
  }

  const teacher = new Teacher(
    "Albus Dumbledore",
    150,
    "Hogwarts",
    "Headmaster"
  );

  teacher.takeClass(3);
  student1.getSleep(534);

  //
}
