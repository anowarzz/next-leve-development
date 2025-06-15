# 📘 TypeScript Basic Types - Learning Notes

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)

_Module 1 of TypeScript Technocrat Track_

</div>

---

## 📚 Module Overview

This module covers the fundamental concepts of TypeScript, from basic setup to core data types and language features. These are my personal learning notes.

## 🎯 Topics Covered

- ✅ TypeScript Introduction & Setup
- ✅ Basic & Advanced Data Types
- ✅ Functions & Methods
- ✅ Objects & Type Safety
- ✅ Modern JavaScript Features in TypeScript

---

## 📝 My Learning Notes

## Introduction to TypeScript

**What Is TypeScript ?**

TypeScript is an Object Oriented Programming Language that is built on top Of JavaScript with Extra Features.

- **TypeScript Can be transpiled into a specific older version of JavaScript !**
- **Browser does not recognize typescript code. It has to be transpiled to JavaScript.**

**Benefits Of TypeScript ?**

- Support Older Browser.
- Type Safety.
- Increase Productivity
- Less Bugs and Less Testing.

**Drawbacks Of TypeScript ?**

- Type Complexities.
- Limited Library Support.
- Over Engineering.
- Migration Challenges

## Install TypeScript and Node Version Manager

Installed NVM (Node Version Manager) And Typescript

## Write Your First TypeScript Program

`tsc - - init` to configure the typescript

and separate the source file and the generated JS file

TS Config ফাইলে `RootDir` এর মধ্যে যেই Folder এর Path দেয়া থাকবে সেই Folder এ সব TS ফাইল থাকবে ।

এবং `OutDir` এর মধ্যে যেই Folder এর Path দেয়া থাকবে সেখানে সব জেনারেট হওয়া JavaScript ফাইল গুলা থাকবে ।

## Basic Data Types of TypeScript

---

- **Primitive Data Types —>**

| String | Number    | Boolean |
| ------ | --------- | ------- |
| Null   | Undefined | Symbol  |

- **Non-Primitive Data Types —>**

| Array | Tuple | Object |
| ----- | ----- | ------ |

- Tuple হলো একটি বিশেষ ধরনের Array যেখানে কোন Index এ কোন ধরনের Data হবে এবং Array এর মোট উপাদান কয়টি হবে তা Fix করে দেয়া যায় ।

Run Time এ আমরা কখনো Typescript পাবো না, কারন Typescript Run ই হবেনা এটা আগে Javscript এ Convert হবে । তাই Typescript এর Type গুলোকে বলা হয় Static Type । এবং JavaScript এর Type গুলোকে বলা হয় Dynamic Type ।

## Object, Optional and Literal Types

- Object এর প্রতিটা Property এর Type Define করে নিতে হবে আগে । Type Define করার সময় কোন Property যদি থাকতেও পারে আবার নাও থাকতে পারে তাহলে তার জন্য Optional ? ব্যবহার করতে হবে ।
- Object এর কোন Property এর Value যদি Type define করার সময়ই Fixed করে দেয়া হয় , তাহলে ওই Value টাই ঐ Property এর জন্য Type হয়ে যায় এবং তা আর পরে পরিবর্তন করা যায় না । তাকে বলা হয় Literal Type

## Functions in TypeScript

Function লিখার সময় Parameter গুলোর Value কি Type এর হবে তা লিখে দিতে হবে । এবং Function টি কোন ধরনের Value Return করবে তা ও লিখে দিতে হবে ।

- Object এর মধ্যে কোন Function লিখলে তাকে Method বলা হয় । এবং Object এর মধ্যে সবসময় Normal Function লিখতে হবে ।

Function Examples

```tsx
/*/ Learning Function /*/
// Normal Function
function add(num1: number, num2: number = 10): number {
  return num1 + num2;
}
const result = add(4, 545);

// Arrow Function
const addArrow = (num1: number, num2: number): number => {
  return num1 + num2;
};
const result2 = addArrow(4, 545);

/*/ Object ===> Function ====> Method /*/
const poorUser = {
  name: "Anowar",
  balance: 20,
  addBalance(borrowedBalance: number): string {
    return `My New balance is ${this.balance} + ${borrowedBalance}`;
  },
};

/*/ Array Mapping  /*/
const arr: number[] = [3, 53, 6];
const newArray: number[] = arr.map((elem: number): number => elem * elem);
```

## Spread and Rest Operator

1. Rest Operator (Three dots: ...):
   - Use in function parameters to collect multiple arguments into an array.
   - Example: **`function sum(...numbers) { return numbers.reduce((acc, num) => acc + num, 0); }`**
2. Spread Operator (Three dots: ...):

   - Use to split elements of an array or properties of an object.
   - Example (array): **`const arr1 = [1, 2, 3];`**
   - **`onst arr2 = [...arr1, 4, 5];`**
   - Example (object): **`const obj1 = { x: 1, y: 2 }; const obj2 = { ...obj1, z: 3 };`**

## Destructuring in TypeScript

Destructuring in TypeScript is a convenient way of extracting multiple values from data stored in objects and arrays. It allows us to unpack values from arrays, or properties from objects, into distinct variables.

```tsx
//object destructuring
const user = {
id: 8347,
name: {
firstName: "Anowar",
middleName: 'Hossain',
lastName:'Mithu'
},
contactNo: 9549555,
address:"Uganda",
};

const {contactNo, name:{firstName}} = user

// array destructuring
const myFriends = ["chandler", "joey", "ross", "rachel", "monica", "phoebe"]

const [,, bestFriend, ...rest] = myFriends;

}
```

## Type Alias in TypeScript

Type alias in TypeScript is a way to give a new name for a type which can be used to refer to it later.

example

```tsx
{
  // Type Alias //

  // creating a TYPE for object
  type Student = {
    name: string;
    age: number;
    contactNo?: string;
    gender: string;
    address: string;
  };
  const student1: Student = {
    name: "Anowar",
    age: 50,
    gender: "male",
    contactNo: "0178545457",
    address: "dhaka",
  };
  const student2: Student = {
    name: "Mir",
    age: 40,
    gender: "male",
    address: "ctg",
  };
  const student3: Student = {
    name: "firoz",
    age: 20,
    gender: "male",
    address: "tangail",
  };

  // creating type with  username;
  type UserName = string;
  type IsAdmin = boolean;
  const userName: UserName = "Persian";
  const isAdmin: IsAdmin = false;
  // Type alias for function
  type Add = (num1: number, num2: number) => number;
  const add: Add = (num1, num2) => num1 + num2;
}
```

## Union and Intersection Types

- Union Type: In TypeScript, a union type allows a variable to hold values of multiple types, separated by a vertical bar (|), such as **`string | number`**.
- Intersection Type: Intersection types combine multiple types into one, creating a type that has all the properties of each type, denoted with an ampersand (&), like **`TypeA & TypeB`**.

## Ternary, Optional Chaining & Nullish Coalescing Operator

1.  Nullish Coalescing Operator (??):

    - Provides a way to return a default value when a variable is null or undefined, but not for falsy values like an empty string or 0. - Example:

    ```tsx
    const input = null;
    const defaultValue = "No value";
    const result = input ?? defaultValue; // Returns "No value" because 'input'
    ```

2.  Optional Chaining (?.): - Allows you to access nested properties or methods of an object without worrying about null or undefined values, reducing potential errors.

    - Example:

    ```tsx
    const user = { name: "John", address: { city: "New York" } };
    const city = user?.address?.city; // Safely access 'city' even if 'address' is null/undefined.
    ```

3.  Ternary Operator (Conditional Operator): - It's a concise way to conditionally choose one of two values based on a condition.

    - Example:

    ```tsx
    javascriptCopy code
    const isRaining = true;
    const weather = isRaining ? "Take an umbrella" : "Enjoy the sun";

    ```

## Never, Unknown and Nullable Types

1. **Never Type**:

   - **Description**: Represents a type that signifies a function will never return a value or code that will never execute. It is used to indicate unreachable code or functions that always throw exceptions.
   - **Example**:
     ```tsx
     function throwError(message: string): never {
       throw new Error(message);
     }
     ```

2. **Unknown Type**:

   - **Description**: Represents a type for values whose type is not known at compile time, requiring type assertions or checks before use to ensure type safety.
   - **Example**:
     ```tsx
     let userInput: unknown;
     if (typeof userInput === "string") {
       const strLength = userInput.length; // Requires type check to use 'userInput'.
     }
     ```

3. **Nullable Type**:
   - **Description**: Allows variables to contain either a value of a specific type or the value **`null`**. It is useful for handling cases where a value might be missing or uninitialized.
   - **Example**:
     ```tsx
     let age: number | null = null;
     age = 25; // Can be assigned a number or null.
     ```
