{
  //  Utility Types

  /*/ Pick Type -> pick type from an existing type /*/
  type Person = {
    name: string;
    age: number;
    email?: string;
    contactNo: string;
  };
  type NameAge = Pick<Person, "name" | "age">;

  /*/ Omit Type -> take an existing type but omit some values /*/

  type ContactInfo = Omit<Person, "name" | "age">;

  /*/ Required Type => take an existing type and make all the property required  /*/
  type PersonRequired = Required<Person>;

  /*/ Partial Type => Take an existing type and make all the property optional /*/
  type PersonPartial = Partial<Person>;

  /*/ Readonly Type => Take an existing type and make all the values read only /*/
  type PersonReadonly = Readonly<Person>;

  const person1: PersonReadonly = {
    name: "The Rock",
    age: 50,
    contactNo: "5343434",
  };

  /*/ Record Type ==> Declaring the types of an object keys and values dynamically before writing the object /*/

  type Myobj = Record<string, unknown>;

  const emptyObj: Record<string, unknown> = {};

  const obj1: Myobj = {
    a: "aaa",
    b: "bb",
    c: "cccc",
    e: 343434,
  };

  //
}
