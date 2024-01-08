// const user1 = {
//   name: "will",
//   score: 3,
//   increment: function () {
//     user1.score++;
//   },
// };
// user1.increment();
// console.log(user1);

// const user2 = {};
// user2.name = "Tayyab";
// user2.score = 5;
// user2.increment = function () {
//   user2.score++;
// };
// console.log(user2);

// const user3 = Object.create(null);

// user3.name = "Omer";
// user3.score = 9;
// user3.incremet = function () {
//   user3.score++;
// };

// console.log(user3);

// // Generalized The Function:
// function userCreator(name, score) {
//   const newUser = {};
//   newUser.name = name;
//   newUser.score = score;
//   newUser.increment = function () {
//     newUser.score++;
//   };
//   return newUser;
// }

// const user4 = userCreator("Ali", 10);
// user4.increment();
// console.log(user4);

// //Generalized Function 2:
// function createUser(name, score) {
//   const updateUser = Object.create(userFunctionStroe);
//   updateUser.name = name;
//   updateUser.score = score;
//   return updateUser;
// }

// const userFunctionStroe = {
//   increment: function () {
//     this.score++;
//   },
//   login: function () {
//     console.log("Logged in");
//   },
// };
// const user5 = createUser("Kami", 33);
// // user5.increment()
// // user5.hasOwnProperty('score')
// // console.log(user5.hasOwnProperty('name'))
// console.log(user5);

// const user6 = new createUser("jon", 66);
// console.log(user6);

// // Prototype Chian Review
// function multiplyBy2(num) {
//   return num * 2;
// }

// multiplyBy2.stored = 5;
// multiplyBy2(3);

// multiplyBy2.stored;
// multiplyBy2.prototype;

// console.log(multiplyBy2.stored);
// console.log(multiplyBy2.prototype);

// // // New Kewword
// class moreUserCreator {
//   constructor(name, score) {
//     this.name = name;
//     this.score = score;
//   }
//   increment() {
//     this.score++;
//   }
//   login() {
//     console.log("login");
//   }
// }


// const user7 = new moreUserCreator("Eva", 9);
// console.log(user7)


