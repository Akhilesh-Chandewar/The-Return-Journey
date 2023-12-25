// Write a function that takes two arrays of integers and 
// return a new array containing the common element between 
// two arrays without using any built in funcions

function findCommonElements(arr1, arr2) {
    const commonElements = [];

    // Iterate through arr1
    for (let i = 0; i < arr1.length; i++) {
        const element = arr1[i];

        // Check if element exists in arr2 and not already in commonElements
        for (let j = 0; j < arr2.length; j++) {
            if (element === arr2[j] && !commonElements.includes(element)) {
                commonElements.push(element);
                break; // Move to the next element in arr1
            }
        }
    }

    return commonElements;
}

console.log(findCommonElements([1,2,3,88,90], [88,90]))
