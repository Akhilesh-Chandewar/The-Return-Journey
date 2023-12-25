//  Write a JavaScript function that takes an array of of integers as 
//  input and returns a new array containing only the unique element 
//  in original array, without using any builtin function for this purpose (e.g. Set)


function findUniqueElements(arr) {
    arr.sort(); // Sort the array

    let j = 0; // Unique list pointer
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[j]) {
            j++;
            arr[j] = arr[i]; // Move unique element
        }
    }

    // Resize array to contain unique elements
    arr.length = j + 1;

    // Return the modified array with unique elements
    return arr;
}

let inputArray = [1, 2, 3, 4, 2, 3, 5];
let resultArray = findUniqueElements(inputArray);
console.log(resultArray);