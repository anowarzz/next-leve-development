"use strict";
{
    // ====> Spread Operator <====
    // spread
    const bros1 = ["Mir", "Firoz", "Mizan"];
    const bros2 = ["Tanmoy", "Nahid", "Rahat"];
    bros1.push(...bros2);
    //   With Object
    const mentors1 = {
        typescript: "Mezba",
        redux: "Mir",
        dbms: "Mizan",
    };
    const mentors2 = {
        prisma: "Firoz",
        next: "Tanmoy",
        cloud: "Nahid",
    };
    const mentorList = Object.assign(Object.assign({}, mentors1), mentors2);
    // <==== Rest Operator <=======
    const greetFriends = (...friends) => {
        friends.forEach((friend) => {
            console.log(`Hi ${friend} ,Welcome`);
        });
    };
    greetFriends("abul", "babul", "kabul", "jabul", "labul");
}
