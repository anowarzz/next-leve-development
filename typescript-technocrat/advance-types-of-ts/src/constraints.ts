{
  // constraints ==> enforcing that some property are must have in that type

  const addCourseToStudent = <
    T extends { id: number; name: string; email: string }
  >(
    student: T
  ) => {
    const course = "Next Level Web Development";

    return {
      ...student,
      course,
    };
  };

  const student3 = addCourseToStudent({
    id: 344,
    name: "Good Boy",
    email: "boy@gmail.com",
  });

  const student1 = addCourseToStudent<{
    id: number;
    name: string;
    email: string;
    devType: string;
  }>({
    id: 333,
    name: "iferg",
    email: "ferg@mail.com",
    devType: "NLWD",
  });
  const student2 = addCourseToStudent({
    id: 334,
    name: "Magnus",
    email: "magnus@mail.com",
    hasWatch: true,
  });

  //
}
