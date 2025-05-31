{
  // generic constraint with keyof operator

  type Vehicle = {
    bike: string;
    car: string;
    ship: string;
  };

  type Owner = "bike" | "car" | "ship";

  type Owner2 = keyof Vehicle;

  const person1: Owner2 = "car";

  const getPropertyValue = <X, Y extends keyof X>(obj: X, key: Y) => {
    return obj[key];
  };

  const user = {
    name: "Jessy Pinkman",
    age: 20,
    address: "somewhere",
  };

  const car = {
    brand: "Ferrai",
    model: "flood bluster",
    year: 4344,
  };

  const result1 = getPropertyValue(car, "brand");

  //
}
