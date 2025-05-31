{
  // Generic with Interface
  interface Developer<T, X = null> {
    name: string;
    computer: {
      brand: string;
      model: string;
      releaseYear: number;
    };
    smartWatch: T;
    bike?: X;
  }

  //  SmartWatch type for the generic parameter
  type EmilabWatch = {
    brand: string;
    model: string;
    display: string;
  };

  const poorDeveloper: Developer<EmilabWatch> = {
    name: "Anowar",
    computer: {
      brand: "acer",
      model: "aspire",
      releaseYear: 2017,
    },
    smartWatch: {
      brand: "Emilab",
      model: "New Model",
      display: "amoled",
    },
  };

  //  apple watch type
  interface AppleWatch {
    brand: string;
    model: string;
    heartTrack: boolean;
    sleepTrack: boolean;
  }

  interface YamahaBike {
    model: string;
    engineCapacity: string;
  }

  const richDeveloper: Developer<AppleWatch, YamahaBike> = {
    name: "Rich Dev",
    computer: {
      brand: "HP",
      model: "Elite Book",
      releaseYear: 2025,
    },
    smartWatch: {
      brand: "apple watch",
      model: "some model",
      heartTrack: true,
      sleepTrack: true,
    },
    bike: {
      model: "Yamaha",
      engineCapacity: "150cc",
    },
  };

  //
}
