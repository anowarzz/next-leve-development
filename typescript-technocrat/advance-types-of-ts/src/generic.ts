{
  // Array using Generic type

  type GenericArray<T> = Array<T>;

  // const rollNumbers : number[] = [3, 8, 5]
  const rollNumbers: GenericArray<number> = [3, 8, 5];

  //   const mentors: string[] = ["Mr.X", "Mr.Y", "Mr.Z"];
  const mentors: GenericArray<string> = ["Mr.X", "Mr.Y", "Mr.Z"];

  //   const boolArray: boolean[] = [true, false, true];
  const boolArray: GenericArray<boolean> = [true, false, true];

  // array of object
  const user: GenericArray<{ name: string; age: number }> = [
    {
      name: "Dexter",
      age: 40,
    },
    {
      name: "scofield",
      age: 38,
    },
  ];

  //   Tuple using generic
  type GenericTuple<X, Y> = [X, Y];

  const humanTuple: GenericTuple<string, string> = ["Human1", "Human2"];

  const userWithID: GenericTuple<number, { name: string; email: string }> = [
    1353,
    { name: "Karen Page", email: "karen@mail.com" },
  ];

  //
}
