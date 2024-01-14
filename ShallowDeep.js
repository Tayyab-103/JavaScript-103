const originalArray = [1,2,{a:3}]

const shallowCopy = [...originalArray]

console.log(originalArray)

function deepCopy(obj) {
    // Convert the object to a JSON string
    var jsonString = JSON.stringify(obj);
  
    // Parse the JSON string to create a new object
    var copy = JSON.parse(jsonString);
  
    return copy;
  }
  
  // Example usage
  var originalObject = { a: 1, b: { c: 2, d: [3, 4] } };
  var deepCopyObject = deepCopy(originalObject);
  
  // Now, modifying the originalObject won't affect deepCopyObject
  originalObject.b.d[0] = 99;
  
  console.log(originalObject);        // { a: 1, b: { c: 2, d: [99, 4] } }
  console.log(deepCopyObject);        // { a: 1, b: { c: 2, d: [3, 4] } }
  

  const Array = ["tayyab", "Imran" , "Kamran"];
  console.log(Array)