{
  // mapped types

  const arrOfNumbers: number[] = [1, 4, 5];

  // const arrayOfString : string[] = ['1', '4', '5']

  const arrOfStrigs: string[] = arrOfNumbers.map((number) => number.toString());

  console.log(arrOfStrigs);

  type AreaNumber = {
    height: number;
    width: number;
  };

  type Height = AreaNumber["height"];

  // type AreaString = {
  //     height: string ;
  //     width: string ;
  // }

  type AreaString<T> = {
    [key in keyof T]: T[key];
  };

  const area1: AreaString<{ height: string; width: number }> = {
    height: "3434",
    width: 3434,
  };

  //
}
