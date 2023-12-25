// Create a JS Object representing a car with properties like brand, model, and year. 
// Write a function that takes two car objects as input and merges them into new Object, 
// presering the properties from both


const car1 = {
    brand : "Car 1 brand",
    model : "Car 1 model",
    year : "Car 1 year"
}

const car2 = {
    // brand : "Car 2 brand",
    // model : "Car 2 model",
    // year : "Car 2 year",
    color : "red"
}

function mergeObjects(obj1, obj2) {
    return { ...obj1, ...obj2 };
}

const mergedCar = mergeObjects(car1, car2);
console.log(mergedCar);

