{
  //  funciton with generic

  const createArray = (param: string): string[] => {
    return [param];
  };

  const createArrayWithGeneric = <T>(param: T): T[] => {
    return [param];
  };

  type User = { id: number; name: string };

  const res1 = createArray("Bangladesh");
  const resGen = createArrayWithGeneric<number>(3434);
  const resGenWithObj = createArrayWithGeneric<User>({
    id: 343,
    name: "Ragnar",
  });

  // =========

  // example of creating array with tuple using generic

  const createArrayWithTuple = <T, Q>(param1: T, param2: Q): [T, Q] => {
    return [param1, param2];
  };

  const res2 = createArrayWithTuple<string, number>("Bangladesh", 1971);
  const res3 = createArrayWithTuple<string, { name: string }>("Bangladesh", {
    name: "Asia",
  });

  const addCourseToStudent = <T>(student: T) => {
    const course = "Next Level Web Development";

    return {
      ...student,
      course,
    };
  };

  const student1 = addCourseToStudent({
    name: "iferg",
    email: "ferg@mail.com",
    devType: "NLWD",
  });
  const student2 = addCourseToStudent({
    name: "Magnus",
    email: "magnus@mail.com",
    hasWatch: true,
  });

  //
}
