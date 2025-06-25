// ===> StateFul <=====
// const counter = {
//   count: 0,
//   increment(newCount) {
//     this.count += newCount
//     console.log(this.count);
//   },
// };


// counter.increment(1) ;
// counter.increment(2) ;
// counter.increment(6) ;


// ===> StateLess <=====


const counter = (newCount) => {
let count = 0 ;

return count+= newCount 

}

console.log(counter(1));
console.log(counter(2));
console.log(counter(6));


