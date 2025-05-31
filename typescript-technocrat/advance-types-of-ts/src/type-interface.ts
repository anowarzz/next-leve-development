{
  // ==> Type and Interface <===

  type User1 = {
    name: string;
    age: number;
  };

  interface User2 {
    name: string;
    age: number;
  }

  type rollNumber = number;

  // extending a type
  type userWithRole = User1 & { role: string };
  interface userWithRole2 extends User2 {
    role: string;
  }

  const user1: userWithRole2 = {
    name: "John Doe",
    age: 30,
    role: "Admin",
  };

  //  =====>  Decalring Array using interface <====
  type Roll1 = number[];
  interface Roll2 {
    [index: number]: number;
  }
  const rollNumber1: Roll2 = [1, 2, 3, 4];

  //  ====> Decalring Function using Interface <=====
  type Add1 = (num1: number, num2: number) => number;
  interface Add2 {
    (num1: number, num2: number): number;
  }
  const add: Add2 = (num1, num2) => num1 + num2;

  //
}
