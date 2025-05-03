{
  // ====> Spread Operator <====

  // spread
  const bros1: string[] = ["Mir", "Firoz", "Mizan"];
  const bros2: string[] = ["Tanmoy", "Nahid", "Rahat"];

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

  const mentorList = {
    ...mentors1,
    ...mentors2,
  };

  // <==== Rest Operator <=======

  const greetFriends = (...friends: string[]) => {
    friends.forEach((friend: string) => {
      console.log(`Hi ${friend} ,Welcome`);
    });
  };

  greetFriends("abul", "babul", "kabul", "jabul", "labul");
}
