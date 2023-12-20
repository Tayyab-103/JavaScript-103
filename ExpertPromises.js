// Promises: 
let promise = new Promise(function(resolve, reject){
    alert("I am an alert in promise")
}) 
console.log("Hello")
setTimeout(function(){
    console.log("Hello in SetTimeOut with 2 Seconds")
}, 2000)


console.log("My name is " +  "Tayyab")



function display(data){
    console.log(data)
}

// const futureData = fetch('https://twitter.com/will/tweets/1')
// futureData.then(display)

// console.log("My First")

// function display(data) {
//     console.log(data);
// }

// const futureData = fetch('https://twitter.com/will/tweets/1')
//     .then(response => response.json()) // Parse the JSON data
//     .then(data => display(data)) // Display the parsed data

// console.log("My First");