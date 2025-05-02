"use strict";
// ==>Learning Function <===
// 1. Normal Function
// 2. Arrow Function
// normal function with default value
function add(num1, num2 = 10) {
    return num1 + num2;
}
const result = add(23, 34);
// arrow function
const addArrow = (num1, num2) => num1 + num2;
// Function inside a function is called METHOD
const poorUser = {
    name: "Joe",
    balance: 35,
    addBalance(borrowedBalance) {
        return `My new balance is ${this.balance + borrowedBalance}`;
    },
};
// console.log(poorUser.addBalance(35));
// ===> Array Mapping <===
const arr = [4, 55, 34, 33];
const newArray = arr.map((elem) => elem * elem);
