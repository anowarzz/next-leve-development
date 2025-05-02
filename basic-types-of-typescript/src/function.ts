// ==>Learning Function <===

// 1. Normal Function
// 2. Arrow Function

// normal function with default value
function add(num1: number, num2: number = 10): number {
  return num1 + num2;
}
const result = add(23, 34);

// arrow function
const addArrow = (num1: number, num2: number): number => num1 + num2;

// Function inside a function is called METHOD
const poorUser = {
  name: "Joe",
  balance: 35,
  addBalance(borrowedBalance: number): string {
    return `My new balance is ${this.balance + borrowedBalance}`;
  },
};
// console.log(poorUser.addBalance(35));

// ===> Array Mapping <===
const arr: number[] = [4, 55, 34, 33];
const newArray: number[] = arr.map((elem: number): number => elem * elem);
