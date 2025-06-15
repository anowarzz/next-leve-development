# 🎯 Object-Oriented Programming TypeScript - Learning Notes

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![OOP](https://img.shields.io/badge/OOP-Concepts-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)

_Module 3 of TypeScript Technocrat Track_

</div>

---

## 📚 Module Overview

This module covers Object-Oriented Programming concepts in TypeScript including classes, inheritance, encapsulation, polymorphism, and abstraction. These are my personal learning notes.

## 🎯 Topics Covered

- ✅ Classes & Objects
- ✅ Inheritance & Polymorphism
- ✅ Access Modifiers & Encapsulation
- ✅ Type Guards & Instance Checking
- ✅ Static Members & Getters/Setters
- ✅ Abstraction Principles

---

## 📝 My Learning Notes

<br>

## Class and Object 📄 [→ Code](./src/class.ts)

#### What Is Object Oriented Programming ?

**OOP is a Programming Paradigm that organizes and models software**

#### What Is Paradigm ?

**The style used to write and organize code .**

class কিওয়ার্ড ব্যবহার করে নতুন Class তৈরী করতে হয় ।

Class এর মধ্যে Method লিখতে সব সময় Normal Function লিখতে হবে ।

- Parameter Property ব্যবহার করলে Explicitly , Constructor এর বাইরে Type Define করতে হবে না এবং ভিতরে `this_dot` ব্যবহার করে Value Assign করতে হবে না ।

<br>

## Inheritance in OOP 📄 [→ Code](./src/inheritance.ts)

Parent Class এর Property গুলো তার Child Class , Access করতে পারে Extend করার মাধ্যমে ।

- কয়েকটি Class নিয়ে কাজ করার সময় উভয় Class এ যেসব Property ও Method কমন রয়েছে সেগুলো নিয়ে আলাদা একটি Type Define করতে হবে ।
- Parent Class এর property গুলো child class যে ব্যবহার করতে পারে Inheritance এর মাধ্যমে

<br>

## Type Guard Using Typeof & In 📄 [→ Code](./src/type-guard.ts)

type of অপারেটর ব্যবহার করে Parameter এর Type check করে সেই অনুযায়ী Runtime এ ডিসিশন নেয়া হলে তাকে type guard বলা হয় ।

- `in` ব্যবহার করে Object এর মধ্যে কোন Property বিদ্যমান আছে কিনা তা জানা যায় । তাকে In guard বলা হয় ।

<br>

## Type Guard Using Instance Of 📄 [→ Code](./src/typeGuard-instanceOf.ts)

কোন একটি Class অন্য একটি Class এর Instance কিনা তা Check করার জন্য instance of ব্যবহার করা হয় ।

<br>

## Access Modifiers 📄 [→ Code](./src/access-modifier.ts)

কোন Parent Class এর সবগুলো Property যেন Instance এর মাধ্যমে Modify করা না যায় , তার জন্য Access Modifier ব্যবহার করা হয় ।

Default ভাবে Parent Class এর সবগুলো Property , Public হয়ে থাকে ।

- Class এর কোন Property এর আগে `read only` ব্যবহার করলে ঐ Property শুধু read করা যাবে, কখনো modify করা যাবে না ।
- Class এর কোন Property এর আগে `Private` ব্যবহার করলে ঐ Property শুধু মাত্র ঐ Parent Class এর মধ্যেই Access করে Modify করা যাবে । এর বাইরে কোথাও modify করা যাবে না ।
- Private Property গুলোর সামনে `underscore _` দিয়ে লিখতে হয় সবসময় ।
- Class এর কোন Property এর আগে `protected` লিখে দিলে ঐ Property টি Parent class এবং Child Class এই দুই জায়গাতে Access পাওয়া যাবে এবং Modify করা যাবে । আর কোথাও কোন Instance এ modify করা যাবে না ।

<br>

## Getter and Setter 📄 [→ Code](./src/getter-setter.ts)

- Getter এর মাধ্যমে একটি Class এর কোন Property get করা যায় ।
- Setter এর মাধ্যমে Class এর কোন Property এর মান Assign করা যায় ।

Getter এবং Setter উভয়ই ব্যবহার করার সময় Property এর মত করে কল করা যায় । তবে তা কাজ করে Function এর মত করে ।

<br>

## Statics in OOP 📄 [→ Code](./src/static.ts)

Class এর কোন একটি Property এর মান বিভিন্ন Instance এর মধ্যে নতুন নতুন memory তে create না হয় সব instance এ একই memory তে রাখতে হলে ঐ Property এর আগে static ব্যবহার করতে হয় । ।

- Static সেট করা কোন Property কে Class এর মধ্যে Class এর নাম ধরে Access করতে হবে । this dot দিয়ে access হবেনা ।
- কোন method কে static করলে ঐ method কে Class এর বাইরে ব্যবহার করতে চাইলে Class এর নামের পরে ডট দিয়ে method কে কল করতে হবে ।
- Static Method ব্যবহার করতে হলে কোন Instance তৈরী করতে হবে না । সরাসরি Class এর নামের পর dot দিয়ে access করলেই হবে ।

<br>

## Polymorphism 📄 [→ Code](./src/polimorphism.ts)

Polymorphism is when we have multiple classes that has the same method but that method has different implementation for each classes

যখন কোন Parent Class এর একটি Method তার Child Class গুলোতে গিয়ে ভিন্ন ভিন্ন আচরন করে তাকে Polymorphism বলে ।

- তবে এক্ষেত্রে base class এ method টি যেভাবে declare করা সেভাবে declare করতে হবে এবং structure এর মধ্যে কোন পরিবর্তন করা যাবে না । শুধুমাত্র ভিতরের কাজ কর্ম ভিন্ন হতে পারে এবং Output ভিন্ন হতে পারে ।

<br>

## Abstraction in OOP 📄 [→ Code](./src/abstraction.ts)

Abstract Interface এবং Class হচ্ছে একটি Class এর Blue Print এর মত ।

Abstract class যদি কোন Class কে Implement করে তাইলে সেই Class কে Abstract Class এর সকল method ফলো করতে হবে । এবং সব Property ব্যবহার করতে হবে ।

চাইলে বাড়তি method এড করা যাবে কিন্তু যেগুলো abstract class এর মধ্যে আছে তা must follow করতে হবে ।

- Abstract Class থেকে কোন instance তৈরী করা যাবে না ।
- শুধুমাত্র Abstract Class কে extent করে নতুন Class তৈরী করা যাবে ।
- Abstract Class এর মধ্যে কোন method implement করা যাবে না । শুধু method গুলো কেমন হবে তার idea রাখা যাবে এবং child class গুলো তে সেগুলো implement করতে হবে ।

<br>

## Encapsulation in OOP 📄 [→ Code](./src/encapsulation.ts)

Encapsulation মানে হলো কোন Property কে বাইরের দুনিয়া থেকে Private বা Protected করে রাখা ।
