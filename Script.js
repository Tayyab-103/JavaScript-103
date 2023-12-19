// // Show Random Names Pick and create a function:
// let names = ["Tayyab", "Lameon", "Kami", "Ijaz", "Parwati"];

// const whosPaying = (names) => {
//   let numberOfPerson = names.length;
//   let randomPersonPosition = Math.floor(Math.random() * numberOfPerson);
//   let randomPerson = names[randomPersonPosition];
//   // return `${randomPerson} is going to buy lunch today!`;
//   return randomPerson + " is going to buy lunch today!";
// };
// console.log(whosPaying(names));

// //Example 1: Check Leap Year Using if...else:

// function isLeap(year) {
//   if ((0 == year % 4 && 0 != year % 100) || 0 == year % 400) {
//     console.log(year + " is a leap Year");
//   } else {
//     console.log(year + " is not a leap year");
//   }
// }
// // take a input:
// const year = prompt('Enter a year:');

// isLeap(year);

//ProtoType:

// const obj1 = new Object({
//     name: "Ajay"

// })

// const obj = new obj();

// const obj2 = {
//     roll: 101,

// }

// const obj = {
//   name: "Tayyab Hameed",
//   getName: function () {
//     return this.name;
//   },
//   getRoll: function () {
//     return this.roll;
//   },
// };
// // console.log(obj);

// const obj1 = {
//   roll: 101,
//   name: "kamran",
//   __proto__: obj,
// };
// // console.log(obj1);

// const obj2 = {
//   class: "BBA",
//   __proto__: obj1,
// };

// // console.log(obj2)

// const array = ["Tayyab Hacker", "Omer", "Kami"];

// // console.log(array.push("Jaman"));
// console.log(array);

// const object = new Object();
// console.log(object);

// const array1 = new Array();
// console.log(array1);

// Array.prototype.show = function () {
//   return this;
// };

// const cities = ["Lahore", "Pakistan"];
// console.log(cities.show());

// // Custom Prototype for Array into Object (Through Object):
// Array.prototype.convertIntoObject=function(){
//     let newObject = {};
//     this.forEach(element=>{
//         newObject[element]= element;
//     })
//     return newObject;
// }
// console.log(cities.convertIntoObject())

// let arr = [['JS', 'JavaScript'], ['GFG', 'GeeksforGeeks']];
// let convertObject = Object.fromEntries(arr)
// console.log(convertObject)

// // Actual prototype (constructor feature in js):
// function MyPrototype (name, roll){
//         this.name = name;
//         this.roll = roll;
//     }
// MyPrototype.prototype=obj

// const myproto = new MyPrototype("Arsalan", "2029");
// console.log(myproto.getName())

//Map, Set, WeakMap & WeakSet in JavaScript

//Set:
//It Contains onnly unique  values
// Object contructor

// let myArray = [1, 2, 3, 4];
// let obj = new Set(myArray);
// console.log(obj.add(5));
// console.log(obj.add(5));

// obj.delete(5);
// console.log(obj);

// let obj1 = {
//   name: "Jugnu",
// };

// obj.add(obj1);
// console.log(obj);
// console.log(obj.has(2));

// for(let new1 of obj){
//     console.log(new1)
// }

// obj.forEach((element)=>{
//     console.log(element)
// })

//Map -> Key -> Values

// let myMap = new Map([["a1", "Ajay"],["a2", "Kami"], ["a3", "John"]]);
// // myMap.set("a1", "kami")
// console.log(myMap)

// for(let [key,value] of myMap){

//     console.log(`key ${key}, value ${value}`)
// }

// myMap.forEach((key,value)=>{
//     console.log(value, key)
// })

// Create a Function copy array and multiply by 2 in a new array
// function copyArrayandMultiplyBy2(array) {
//   let output = [];
//   for (i = 0; i < array.length; i++) {
//     output.push(array[i] * 2);
//   }
//   return output;
// }

// const myArray = [1, 2, 3,4,5,6];
// let result = copyArrayandMultiplyBy2(myArray);
// console.log(result);

// Create a Function copy array and divided by 2 in a new array
// function copyArrayandDividedBy2(array) {
//   let output = [];
//   for (i = 0; i < array.length; i++) {
//     output.push(array[i] / 2);
//   }
//   return output;
// }

// const myArray = [1, 2, 3,4,5,6];
// let result = copyArrayandDividedBy2(myArray);
// console.log(result);

// function x() {
// var i;
//     for (let i = 1; i <= 5; i++) {
//         console.log(i)
//       setTimeout(function () {
//         console.log(i);
//       }, i * 1000);
//     }
//   }
//   x();

// Reviewing Generalizing Function
// function copyArrayandMultiply(array, callback, number) {
//   let output = [];
//   for (i = 0; i < array.length; i++) {
//     output.push(callback(array[i], number));
//   }
//   return output;
// }
// function multiplyBy2(input, number) {
//   return input * number;
// }
// const myArray = [1, 2, 3, 4, 5, 6];
// let result = copyArrayandMultiply(myArray, multiplyBy2, 2);
// console.log(result);

// function copyArrayandMultiply(array, callback) {
//   let output = [];
//   for (i = 0; i < array.length; i++) {
//     output.push(callback(array[i], 2  ));
//   }
//   return output;
// }
// function multiplyBy2(input, number) {
//   return input * number;
// }
// const myArray = [1, 2, 3, 4, 5, 6];
// let result = copyArrayandMultiply(myArray, multiplyBy2);
// console.log(result);

//Closure Concepts Frontend Master

// function instructionGenerator() {
//   function multiplyBy2(num) {
//     return num * 2;
//   }
//   return multiplyBy2;
// }

// let generatedFunc = instructionGenerator();

// How can we run/ call multiplyBy2 now?

// const num = 3;
// function multiplyBy2(inputNumber) {
//   const result = inputNumber * 2;
//   return result;
// }
// const output = multiplyBy2(num);
// console.log(output);
// const newOutput = multiplyBy2(10);
// console.log(newOutput);

// Square Function
// function tenSquare(){
//   return 9 *9;
// }
// console.log(tenSquare());

//Generalizing Function
// function tenSquare(num){
//   return num *num;
// }
// console.log(tenSquare(10));

// function copyArrayAndManipulate(array, instrctions) {
//   let output = [];
//   for (i = 0; i < array.length; i++) {
//     output.push(instrctions(array[i]));
//   }
//   return output;
// }
// const multiplyBy2 = (input) => {
//   return input * 2;
// };
// const myArray = [1, 2, 3];
// let result = copyArrayAndManipulate(myArray, multiplyBy2);
// console.log(result);

// Closure:

// Returning Function ( Functions can be returned from other functions in js )

// function createFunction(){
//   function multiplyBy2(num){
//     return num * 2
//   }
//   return multiplyBy2;
// }

// const generatedFunc = createFunction();
// const result = generatedFunc(3)
// console.log(result)

// Calling a function in the same function call as it was defined

// function outer(){
//   let counter = 0;
//   function incrementCounter (){
//     counter ++;
//   }
//   incrementCounter()

// }

// outer()

// function outer() {
//   let counter = 0;

//   function incrementCounter() {
//     counter++;
//   }

//   incrementCounter();

//   return counter; // Add a return statement to make the counter accessible outside the function
// }

// const result = outer();
// console.log(result); // Log the result to see the value of the counter

// function outer() {
//   let counter = 0;
//   function incrementCounter() {
//     counter++;

//     console.log(counter);
//     // return counter
//   }
//   return incrementCounter;
// }

// const newCounterNumber = outer();
// newCounterNumber();
// newCounterNumber();

// const newCounterNumber1 = outer();
// newCounterNumber1();
// newCounterNumber1();



// Challenge 1
// Create a function createFunction that creates and returns a function. When that created function is called, it should print "hello". When you think you completed createFunction, un-comment out those lines in the code and run it to see if it works.
// function createFunction() {
//   return function(){
//     console.log('hello')
//   } 
// }
// const function1 =  createFunction();
//   function1();




  
