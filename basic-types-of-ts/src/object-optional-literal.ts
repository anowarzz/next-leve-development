//  ==> Reference Data type === Object

const user: {
  firstName: string;
  middleName?: string; // Optional type
  lastName: string;
  isMarried: boolean;
  readonly company: "Nobody Really Knows"; // fixed value => literal types
} = {
  firstName: "Chandler",
  middleName: "Matthew",
  lastName: "Bing",
  isMarried: true,
  company: "Nobody Really Knows",
};
