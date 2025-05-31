{
  //  ternary operator || optional chaining || nullish coalescing operator

  const age: number = 19;
  // if else
  if (age >= 18) {
    console.log("adult");
  } else {
    console.log("not an adult");
  }

  // ternary
  const isAdult = age >= 18 ? "Adult" : "Not Adult";
  //   console.log(isAdult);

  // Nullish coalescing operator
  // _> making a decision based on null or undefined ==>  if the value of the variable is null or undefined then i can set a value to be true while the value is null or undefined ;

  const isAuthenticated = "";

  const result1 = isAuthenticated ?? "Guest";
  console.log({ result1 });

  const result2 = isAuthenticated ? isAuthenticated : "Guest";
  console.log({ result2 });

  // optional chaining
  type User = {
    name: string;
    address: {
      city: string;
      road: string;
      presentAddress: string;
      permenentAddress?: string;
    };
  };

  const user: User = {
    name: "Anowar",
    address: {
      city: "comilla",
      road: "good road",
      presentAddress: "vuuter goli",
    },
  };

  const permenentAddress =
    user?.address?.permenentAddress ?? "No permenent address found";
  console.log(permenentAddress);

  //
}
