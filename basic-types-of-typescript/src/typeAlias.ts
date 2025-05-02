{
  type Student = {
    name: string;
    age: number;
    gender: string;
    contactNo?: string;
    address: string;
  };

  const student1: Student = {
    name: "Ross Geller",
    age: 30,
    gender: "Male",
    contactNo: "123-456-7890",
    address: "123 Main St, Springfield",
  };

  const student2: Student = {
    name: "Rachel Green",
    age: 28,
    gender: "Female",
    contactNo: "987-654-3210",
    address: "456 Elm St, Springfield",
  };

  const student3: Student = {
    name: "Monica Geller",
    age: 29,
    gender: "Female",
    contactNo: "555-123-4567",
    address: "789 Oak St, Springfield",
  };

  //  type alias with number
  type UserName = string;
  const userName: UserName = "Anowar";
  type IsAdmin = boolean;
  const isAdmin: IsAdmin = true;

  //  Type alias for function
  type Add = (num1: number, num2: number) => number;

  const add: Add = (num1, num2) => num1 + num2;

}
