function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
}

var array = [
    { name:"string 1", value:"this", other: "that" },
    { name:"string 2", value:"this", other: "that" }
];

var resultObject = search("string 1", array);





////////////////////////////////////

let arr = [
    { name:"string 1", value:"this", other: "that" },
    { name:"string 2", value:"this", other: "that" }
];

let obj = arr.find(o => o.name === 'string 1');

console.log(obj);
//////////////////////////////////////////
