{
  //  conditional types
  //  ==> if a type is dependent on another type

  type a1 = number;
  type b1 = undefined;

  type x = a1 extends null ? true : false; // false

  type z = a1 extends null ? true : b1 extends undefined ? undefined : any; // undefined

  type Sheikh = {
    bike: string;
    car: string;
    ship: string;
    plane: string;
  };

  // checking if has bike / car / ship / tractor

  type CheckVehicle<T> = T extends keyof Sheikh ? true : false;

  type HasBike = CheckVehicle<"bike">;

  //
}
