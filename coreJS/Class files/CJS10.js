
class MyError extends Error {
    constructor(data) {
      this.data = data;
    }
   }

   
function MakePromis(sec,completed,RdsolveValue){
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            if (completed) {
                resolve(RdsolveValue);
            } else {
                reject("Promis failed");
            }
        }, sec* 1000);
    });
}

console.log("start :---------------------------------------");
let promis1 = MakePromis(2,true,'First promis resolved');
let promis2 = MakePromis(2,true,'Second promis resolved');
let promis3 = MakePromis(3,true,'Third promis resolved');



// promis1
// .then(success => console.log(success))
// .catch(reason => console.log(reason))
// .finally(() => console.log("promis1 finally called "));


// Promise.all([promis1, promis2, promis3]).then(result => {
//     console.log({result});
// }).catch(error => {
//     console.log('An Error Occured');
// });


Promise.any([promis1, promis2, promis3]).then(result => {
    console.log({result});
}).catch(error => {
    console.log('An Error Occured');
}).catch(error => {
    console.log('An Error Occured');
});


console.log("stop :---------------------------------------");