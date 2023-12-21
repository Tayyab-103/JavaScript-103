// Promises:
// let promise = new Promise(function(resolve, reject){
//     alert("I am an alert in promise")
// })
// console.log("Hello")
// setTimeout(function(){
//     console.log("Hello in SetTimeOut with 2 Seconds")
// }, 2000)

// console.log("My name is " +  "Tayyab")

// function display(data){
//     console.log(data)
// }

// const futureData = fetch('https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8')
// futureData.then(display)

// console.log("My First")

function display(data) {
  console.log(data);
}
function printHello() {
  console.log("Hello");
}
function blockFor300ms() {}
setTimeout(printHello, 2000);

const futureData = fetch(
  "https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8"
).then((response) => response.json());
futureData.then(display);
// .then((data) => display(data));
blockFor300ms();
console.log("Me First");


