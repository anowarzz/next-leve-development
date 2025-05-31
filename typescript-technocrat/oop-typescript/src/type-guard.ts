{
  // Type Guard  using typeof and in

  // ===> Type Guard using typeof

  type Alphaneumeric = string | number;

  const add = (param1: Alphaneumeric, param2: Alphaneumeric): Alphaneumeric => {
    if (typeof param1 === "number" && typeof param2 === "number") {
      return param1 + param2;
    }

    return param1.toString() + param2.toString();
  };

  const result1 = add(53, 55);
  console.log(result1);
  const result2 = add("55", "55");
  console.log(result2);

  // ===> Type Guard using 'in'

  type NormalUser = {
    name: string;
  };
  type AdminUser = {
    name: string;
    role: "admin";
  };

  const getUser = (user: NormalUser | AdminUser) => {
    if ("role" in user) {
      console.log(`${user.name} is an admin.`);
    } else {
      console.log(`${user.name} is a normal user.`);
    }
  };

  const normalUser: NormalUser = {
    name: "Normal Freeman",
  };

  getUser(normalUser);

  const adminUser: AdminUser = {
    name: "Admin Smith",
    role: "admin",
  };

  getUser(adminUser);

  //
}
