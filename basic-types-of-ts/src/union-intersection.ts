{
  //  --> Union Type <----

  type FrontendDeveloper = "fakibazDeveloper" | "juniorDeveloper";
  type FullstackDeveloper = "frontendDeveloper" | "expertDevelper";

  type Developer = FrontendDeveloper | FullstackDeveloper;

  const newDeveloper: FrontendDeveloper = "fakibazDeveloper";

  type User = {
    name: string;
    email?: string;
    gender: "male" | "female";
    bloodGroup: "O+" | "A+" | "B+" | "AB+";
  };

  const user1: User = {
    name: "Daniel",
    email: "ricardo@mail.com",
    gender: "male",
    bloodGroup: "O+",
  };

  // --> Intersectio Type <----

  type FrontendDev = {
    skills: string[];
    designation1: "Frontend Developer";
  };

  type BackendDev = {
    skills: string[];
    designation2: "Backend Developer";
  };

  type FullstackDev = FrontendDev & BackendDev;

  const FullstackDev: FullstackDev = {
    skills: ["JavaScript", "TypeScript", "React", "Node.js"],
    designation1: "Frontend Developer",
    designation2: "Backend Developer",
  };
}
