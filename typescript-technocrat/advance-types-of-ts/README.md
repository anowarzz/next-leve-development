# 🚀 TypeScript Advanced Types - Learning Notes

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)

_Module 2 of TypeScript Technocrat Track_

</div>

---

## 📚 Module Overview

This module covers advanced TypeScript concepts including generics, type assertions, interfaces, and complex type manipulations. These are my personal learning notes.

## 🎯 Topics Covered

- ✅ Type Assertion & Type Narrowing
- ✅ Interface vs Type Alias
- ✅ Generic Types & Interfaces
- ✅ Function Generics
- ✅ Advanced Type Manipulations

---

## 📝 My Learning Notes

<br>

## Type Assertion / Type Narrowing 📄 [→ Code](./src/type-assertion.ts)

**Type assertion** is a way to tell the TypeScript compiler that you know more about the type of a value than it does,

TypeScript এ `as` ব্যবহার করার মাধ্যমে যদি আমি Type ফিক্সড করে দেই তাহলে TypeScript অন্ধের মত আমার দেয়া Type কে বিশ্বাস করে নিবে ।

```tsx
const value: unknown = "Hello, TypeScript!";
const length = (value as string).length; // Type assertion to treat 'value' as a string.
```

<br>

## Interface, Type vs Interface 📄 [→ Code](./src/type-interface.ts)

Interface শুরু হয় একটি Second Bracket দিয়ে { } বা Object দিয়ে ।

- সকল Primitive Value এর জন্য type alias ব্যবহার করতে হবে ।
- Non-Primitive Value এর জন্য Type alias বা Interface দুটোই ব্যবহার করা হয় ।
- Most of the Time আমাকে Type alias ব্যবহার করতে হবে শুধু Object এর জন্য চাইলে Interface ব্যবহার করা যেতে পারে ।
- Type কে Extend করে Interface বানানো যায় ।

```tsx
//  ==> using type alias ==> In Object
type User1 = {
  name: string;
  age: number;
};
//  ==> using interface
interface User2 {
  name: string;
  age: number;
}

type UserWithRole1 = User1 & { role: string };

interface UserWithRole2 extends User2 {
  role: string;
}
```

- Type কে ও extend করা যায় । যার মধ্যমে interface এর সাথে ব্যবহার করা যায় mix and match করে ।
- Interface এর মাধ্যমে Object ছাড়াও Array ও Declare করা যায় ।

```tsx
// js ==> object, array => object, function => object
type Roll1 = number[];

interface Roll2 {
  [index: number]: number;
}

const rollNumber1: Roll2 = [1, 2, 3];

/*/ Interface in function /*/
type Add = (num1: number, num2: number) => number;
// Interface
interface Add2 {
  (num1: number, num2: Number): number;
}

const add: Add = (num1, num2) => num1 + num2;
```

<br>

## Introduction to Generics 📄 [→ Code](./src/generic.ts)

Generics in TypeScript are like placeholders for data types. They allow Us to define the data type of one or more variables or parameters at runtime, rather than specifying it at design time. This dynamic typing helps create more versatile and reusable code.

## Generic With Interface 📄 [→ Code](./src/generic-with-interface.ts)

```tsx
{
  // Interface - Generic

  // MAIN TYPE FORMATE
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

  // EmilabWatch type
  type EmilabWatch = {
    brand: string;
    model: string;
    display: string;
  };

  // Poor dev object
  const poorDeveloper: Developer<EmilabWatch> = {
    name: "Anowar",
    computer: {
      brand: "Acer",
      model: "E-75",
      releaseYear: 2017,
    },
    smartWatch: {
      brand: "Emilab",
      model: "kw66",
      display: "OLED",
    },
  };

  // AppleWatch interface
  interface AppleWatch {
    brand: string;
    model: string;
    heartTrack: boolean;
    sleepTrack: boolean;
  }

  // bike interface
  interface YamahaBike {
    model: string;
    engineCapacity: string;
  }

  // rich dev object
  const richDeveloper: Developer<AppleWatch, YamahaBike> = {
    name: "Rich Dev",
    computer: {
      brand: "HP",
      model: "AC435",
      releaseYear: 2020,
    },
    smartWatch: {
      brand: "Apple Watch",
      model: "something",
      heartTrack: true,
      sleepTrack: true,
    },
    bike: {
      model: "yamaha",
      engineCapacity: "100CC",
    },
  };
}
```

<br>

## Function With Generics 📄 [→ Code](./src/function-with-generic.ts)

```tsx
{
  /*/ Function with Generics /*/

  const createArray = (param: string): string[] => {
    return [param];
  };

  const createArrayWithGeneric = <T,>(param: T): T[] => {
    return [param];
  };

  const res1 = createArray("Bangladesh");
  const resGeneric = createArrayWithGeneric<string>("Bangladesh");

  type User = { id: number; name: string };

  const resGenericObj = createArrayWithGeneric<User>({
    id: 222,
    name: "MR Pashan",
  });

  /*/ Create array with tuple using a function/*/
  const createArrayWithTuple = <T, Q>(param1: T, param2: Q): [T, Q] => {
    return [param1, param2];
  };

  const res10 = createArrayWithTuple<string, number>("Bangladesh", 222);
  const resTuple = createArrayWithTuple<string, { name: string }>(
    "Bangladesh",
    { name: "Asia" }
  );

  // adding a course to a student
  const addCourseToStudent = <T,>(student: T) => {
    const course = "Next Level Web Development";
    return {
      ...student,
      course,
    };
  };

  const student1 = addCourseToStudent({
    name: "Mr X",
    email: "x@gmail.com",
    devType: "NLWD",
  });
  const student2 = addCourseToStudent({
    name: "Mr Y",
    email: "y@gmail.com",
    devType: "NLWD",
    hasWatch: "Applewatch",
  });
}
```

<br>

## Constraints in TypeScript 📄 [→ Code](./src/constraints.ts)

Generic Type এর মধ্যে যদি কিছু Property এবং এদের Type গুলো Enforce করে দেয়া হয় যে এগুলো থাকতেই হবে তাকে Constraints বলে ।

<br>
## Constraints Using Key Of 📄 [→ Code](./src/constraints-keyof.ts)

Function এর মধ্যে কোন Object পাঠানো হলে বা কোন Object এর Property গুলোর ব্যবহার করতে হলে সেই Object এর সবগুলো Property কে এক সাথে Mention করার জন্য key of ব্যবহার করা হয় ।

key of এর মাধ্যমে একটি type বের সবগুলো key দিয়ে union type তৈরী হয় ।

<br>

## Asynchronous TypeScript 📄 [→ Code](./src/asynchronous-typescript.ts)

Promise Handling In Typescript Using types Practiced

<br>

## Conditional Types 📄 [→ Code](./src/conditional-types.ts)

Typescript এ কোন একটি Type এর মান যদি অন্য একটি Type এর ঊপর নির্ভর করে কোন একটি Condition এর উপর ভিত্তি করে তাহলে তাকে Conditional Type বলে ।

<br>

## Mapped Types 📄 [→ Code](./src/mapped-types.ts)

কোন Object এর Key এর টাইপ Lookup করে নিয়ে আসলে তাকে বলে Lookup type

মুলত কোন existing object এর key এর value গুলোর type সহজে পরিবর্তন করার জন্য ঐ object এর key গুলোর উপর map করে একই সাথে সবগুলোর type পরিবর্তন করে দেয়া হয় mapped types এর মাধ্যমে ।

```tsx
type AreaNumber = {
  height: number;
  width: number;
};
//lookup type
type Height = AreaNumber["height"];
// mapped type
type AreaString = {
  [key in keyof AreaNumber]: string;
};
```

<br>

## Utility Types 📄 [→ Code](./src/utility-types.ts)

**Pick Type**

যখন Existing কোন Variable এর কোন একটি Property এর Type থেকে Pick করে অন্য Variable এর Type হিসাবে Define করা হয় তাকে Pick Type বলে ।

- Omit হচ্ছে Pick এর উলটো । Omit এর মধ্যে যেসব Property উল্লেখ করা হবে সেগুলো বাদে বাকি Property এর Type গুলো Inherit করা হবে ।
- একটি Existing Type এর সবগুলো Property Required করে একটি নতুন Type বানাতে Required ব্যবহার করা হয় ।
- একটি Existing Type এর সবগুলো Property - Optional করে একটি নতুন Type বানাতে Partial ব্যবহার করা হয় ।
- একটি Existing Type এর সবগুলো Property - `readOnly` করে একটি নতুন Type বানাতে ReadOnly ব্যবহার করা হয় ।

Record ব্যবহার করে Object এর key এর ভ্যালু গুলো string হিসেবে Define করে দেয়া যায়

```tsx
type MyObj = Record<string, string>;
const obj1: MyObj = {
  a: "aa",
  b: "b",
  c: "ad",
};
const EmptyObj: Record<string, unknown> = {};
```
