{
  // type assertion ==> means i know types more than typescript

  let anything: any;

  anything = "next level development";

  anything as string;

  const kgToGram = (value: string | number | undefined) => {
    if (typeof value === "string") {
      const convertedValue = parseFloat(value) * 1000;
      return `The converted value is ${convertedValue}`;
    }
    if (typeof value === "number") {
      const convertedValue = value * 1000;
      return convertedValue;
    }
  };

  const result = kgToGram(34) as number;
  const result2 = kgToGram("45") as string;
  console.log(result);

  //  example with try catch

  type CustomError = {
    message: string;
  };

  try {
  } catch (error) {
    console.log((error as CustomError).message);
  }

  //
}
