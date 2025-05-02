"use strict";
var _a, _b;
{
    //  ternary operator || optional chaining || nullish coalescing operator
    const age = 19;
    // if else
    if (age >= 18) {
        console.log("adult");
    }
    else {
        console.log("not an adult");
    }
    // ternary
    const isAdult = age >= 18 ? "Adult" : "Not Adult";
    //   console.log(isAdult);
    // Nullish coalescing operator
    // _> making a decision based on null or undefined ==>  if the value of the variable is null or undefined then i can set a value to be true while the value is null or undefined ;
    const isAuthenticated = "";
    const result1 = isAuthenticated !== null && isAuthenticated !== void 0 ? isAuthenticated : "Guest";
    console.log({ result1 });
    const result2 = isAuthenticated ? isAuthenticated : "Guest";
    console.log({ result2 });
    const user = {
        name: "Anowar",
        address: {
            city: "comilla",
            road: "good road",
            presentAddress: "vuuter goli",
        },
    };
    const permenentAddress = (_b = (_a = user === null || user === void 0 ? void 0 : user.address) === null || _a === void 0 ? void 0 : _a.permenentAddress) !== null && _b !== void 0 ? _b : "No permenent address found";
    console.log(permenentAddress);
    //
}
