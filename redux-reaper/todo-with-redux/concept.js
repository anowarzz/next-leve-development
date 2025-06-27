/**
 * ===>  Mutation Of Object   ==>
 * 
 * 
 * 
 * const employee = {
  name: "Anowar",
  address: { country: "Bangladesh", city: "Dhaka" },
};

const employee2 = employee ;
employee2.name = "Riaz"


const employee3 = {...employee, name: "Jibon", address: {...employee.address, city: "Khulna"}} ;




console.log(employee);
console.log(employee2);
console.log(employee3);

 * 
 * 
 * 
  */

//  Function Currrying

// * normal function
const add = (a, b) => a + b;

// * Currrying function

// const add2 = (a) => (b) => a + b ;

function add2(a) {
  return function (b) {
    return a + b;
  };
}

console.log(add(2, 3));
console.log(add2(2)(6));

//  EXAMPLE OF CURRYING //

// * Normal Func
// const totalPrice = (amount, discount) =>  amount - amount * discount;

// console.log(totalPrice(100, 0.3));

// ** Currrying Func
const totalPrice2 = (discount) => (amount) => amount - amount * discount;

const withDiscount = totalPrice2(0.3);

console.log(withDiscount(100));
console.log(withDiscount(200));
console.log(withDiscount(300));
