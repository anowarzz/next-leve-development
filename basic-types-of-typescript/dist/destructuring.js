"use strict";
{
    // ====> Destructuring <=====
    const user = {
        id: 534,
        name: {
            firstName: "Wilson",
            midleName: "Unknown",
            lastName: "Fisk",
        },
        contactNo: "01734334343",
        email: "wilson.fisk@example.com",
        address: "Hell's Kitchen",
    };
    const { contactNo, name: { midleName }, } = user;
    // ==> Array Destructuring <===
    const myfriends = ["Chandler", "Joe", "Ross", "Monica", "Phoebe"];
    const [, , bestFriend, ...rest] = myfriends;
}
