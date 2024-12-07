let complexArray = [
    { name: "Alice", address: { city: "Wonderland", zip: 12345 } },
    { name: "Bob", address: { city: "Builderland", zip: 54321 } }
];

let complexArray2 = [
    { name: "Alice2", address: { city: "Wonderland", zip: 12345 } },
    { name: "Bob", address: { city: "Builderland", zip: 54321 } }
];

var a1 = [ {id:1,value:'kkr'}, {id:2,value:'csk'}];
var a2 = [ {id:1,value:'mi'}];



// console.log(complexArray.concat(complexArray2))
console.log(a1.concat(a1))

console.log('----map-----')
complexArray.map((val) => console.log(val.name));

console.log('----map-----')
complexArray.filter((val) => console.log(val.name));

console.log('----map-----')
complexArray.find((val) => console.log(val.name));

console.log('----reduce-----')
complexArray.reduce((val) => console.log(val.name));

console.log('----forEach-----')
complexArray.every((val) => console.log(val.name))

console.log('----forEach-----')
complexArray.forEach((val)=> console.log(val.name))

