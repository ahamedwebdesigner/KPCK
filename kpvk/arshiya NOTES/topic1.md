//1) creating promis 
//////////////////////////////////////////////////////////////////

let promise = new Promise((resolve, reject)=>{
    // async task 
    let asynctaskStatus = false;

    if(asynctaskStatus){
        resolve("I am resolved");
    }else{
        reject("Error occured");
    }
});


promise.then((result)=>{
    console.log(result)
},(error)=>{
    console.log(error);
});


2) accessing asyncronous feature data problem
//////////////////////////////////////////////////////////////////


// prob1: cont access async valur 
    function someAsyncFunction(name){
        setTimeout(()=>{
        return  name.toLocaleUpperCase()
        },3000) ;
    }


    function consumenr(){
        let getGetName = someAsyncFunction("Mustaq");
        console.log(getGetName);
    }
    consumenr();


//solution 


    function someAsyncFunction(name){
    return new Promise((res,reg)=>{
        setTimeout(()=>{
            res( name.toLocaleUpperCase());
        },3000) ;
    });
    }

    function consumenr(){
        let getGetName = someAsyncFunction("Mustaq");

        getGetName.then(
            (result)=>{ console.log(result)},
            (error)=>{console.log(error)},
        );

    }
    consumenr();


// 3. states of promis
///////////////////////////////////////////////////////////////////////////////

##### state – This property can have the following values:
1. pending: Initially when the executor function starts the execution.
2. fulfilled: When the promise is resolved.
3. rejected: When the promise is rejected.
4. settled - Has fulfilled or rejected



    let resolvePromise = new Promise(function(resolve, reject) {
            setTimeout(()=>{
                resolve("I am done");
             },3000) ;
       
    });

    // reject promiss with error 

    let rejectPromise = new Promise(function(resolve, reject) {
        reject(new Error('Something is not right!'));
    });


    console.log(resolvePromise);
    console.log(rejectPromise);


    setTimeout(()=>{
        console.log(resolvePromise);
    },4000) ;


// inspecting promiss in node evnirement


    util = require('util');
    var promise1 = new Promise (function (resolve) {});
    var promise2 = new Promise (function (resolve) {resolve ('this is value');});
    var promise3 = new Promise (function (resolve,rejected) {rejected ('rejected value');});

    // console.log(util.inspect (promise1)); 
    // console.log(util.inspect (promise2)); 
    // console.log(util.inspect (promise3)); 



    // console.log(process.binding('util').getPromiseDetails(promise1));
    // console.log(process.binding('util').getPromiseDetails(promise2));
    // console.log(process.binding('util').getPromiseDetails(promise3));



### executor should call only one resolve or one reject

Once one state is changed (pending => fulfilled or pending => rejected), that's all. Any further calls to resolve or reject will be ignored.

    let promise = new Promise(function(resolve, reject) {
    resolve("I am surely going to get resolved!");

    reject(new Error('Will this be ignored?')); // ignored
    resolve("Ignored?"); // ignored
    });

    promise.then((rese)=>console.log(rese));



/// handling promis
/////////////////////////////////////////////////////////////////////////////////////////////////
### handle a Promise

- A Promise uses an executor function to complete a task (mostly asynchronously). 
- A consumer function (that uses an outcome of the promise) should get notified when the executor function is done with either resolving (success) or rejecting (error).


The handler methods, .then(), .catch() and .finally(), help to create the link between the executor and the consumer functions so that they can be in sync when a promise resolves or reject

## <<sintax>> Then
 The then() method is used to schedule a callback to be executed when the promise is successfully resolved.
    
    promiseObject.then(onFulfilled, onRejected);

    

function someAsyncFunction(name){
    return new Promise((res,reject)=>{
      setTimeout(()=>{
         //  res( name.toLocaleUpperCase());         
         reject(new Error('Something is not right!'));
        //reject("this is rejuct data");
        },3000) ;
    });
  }
  
  function consumenr(){
      let getGetName = someAsyncFunction("Mustaq");
  
      getGetName.then(
                (result)=>{ console.log(result)},
                //null,
                (error)=>{console.log(error)},
            )
               .catch(reason => console.log(reason))
               .finally(() => console.log("GetGetName promis compleated"));
  
  }
  consumenr();

### topic : promis chaining

- we can modify and retrun value form the then block 
- the preeseding then consumer function contain return value
- if we have new comsumner then funciton it will recieve original value



    function someAsyncFunction(name){
        return new Promise((res,reject)=>{
        setTimeout(()=>{
            res( name.toLocaleUpperCase());         
            // reject(new Error('Something is not right!'));
            //reject("this is rejuct data");
            },3000) ;
        });
    }
    
    function consumenr(){
        let getGetName = someAsyncFunction("Mustaq");
    
        getGetName.then(
                    (result)=>{  //1)
                        console.log(result);     
                        return result + " altered value ";
                    },
                    //null,
                    (error)=>{console.log(error)},
                )
                .then(
                    (result)=>console.log(result), //3)
                    (error)=>console.log(error),
                )
                .catch(reason => console.log(reason))
                .finally(() => console.log("GetGetName promis compleated")); //4)

            getGetName.then(
                (result)=>console.log("2 ->"+ result), //2)
                (error)=>console.log(error),
            );
    
    }
    consumenr();



### working with multiple promises
- promis.all() is used to excuite multiple promisis at once 

        let musPromis = someAsyncFunction("Mustaq");
        let ArsPromis = someAsyncFunction("Arshiya");

        Promise.all([musPromis, ArsPromis]).then((values) => {
            console.log(values);
        });

- all the promises will resolve then resolve will be called

        let musPromis = PromisGenerator("Mustaq",true);
        let ArsPromis = PromisGenerator("Arshiya",false);

        Promise.all([musPromis, ArsPromis]).then(
            (values) => { console.log(values)}, // called wen all the promises resolved
            (error) => { console.log(error)}
        );
### variable timing promises



## Promis.any(): takes array of promises and 

Promise.any() takes an iterable of Promise objects and, as soon as one of the promises in the iterable fulfills, returns a single promise that resolves with the value from that promise. If no promises in the iterable fulfill (if all of the given promises are rejected), then the returned promise is rejected with an
            
    function PromisGenerator(name,responseType){
        return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(responseType){
                resolve(name.toLocaleUpperCase());    
            }else{
                //  reject(new Error('Something is not right!'));
                reject("this is rejuct data");
            }
            },3000) ;
        });
    }
    
    function consumenr(){

        let musPromis = PromisGenerator("Mustaq",true);
        let ArsPromis = PromisGenerator("Arshiya",true);

        Promise.any([musPromis, ArsPromis]).then(
            (values) => { console.log(values)}, // called wen all the promises resolved
            (error) => { console.log(error)}
        );

## Promise.allSettled()

he Promise.allSettled() method returns a promise that resolves after all of the given promises have either fulfilled or rejected, with an array of objects that each describes the outcome of each promise.

    function PromisGenerator(name,responseType,nSec){
        return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(responseType){
                resolve( name.toLocaleUpperCase());    
            }else{
                //  reject(new Error('Something is not right!'));
                reject("this is rejuct data");
            }
            },1000*nSec) ;
        });
    }
    
    function consumenr(){

        let musPromis = PromisGenerator("Mustaq",true,5);
        let ArsPromis = PromisGenerator("Arshiya",false,3);

        Promise.allSettled([musPromis, ArsPromis]).then(
            (values) => { console.log(values)}, // called wen all the promises resolved
            (error) => { console.log(error)}
        );


    
    }
    consumenr();


### Promise.race()

The Promise.race() method returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects, with the value or reason from that promise

        function PromisGenerator(name,responseType,nSec){
            return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                if(responseType){
                    resolve( name.toLocaleUpperCase());    
                }else{
                    //  reject(new Error('Something is not right!'));
                    reject("this is rejuct data");
                }
                },1000*nSec) ;
            });
        }
        
        function consumenr(){

            let musPromis = PromisGenerator("Mustaq",true,5);
            let ArsPromis = PromisGenerator("Arshiya",false,3);

            Promise.race([musPromis, ArsPromis]).then(
                (values) => { console.log(values)}, // called wen all the promises resolved
                (error) => { console.log(error)}
            );


        
        }
        consumenr();

## Promise.resolve()
The Promise.resolve() method returns a Promise object that is resolved with a given value

    Promise.resolve('Success').then(function(value) {
        console.log(value); // "Success"
        }, function(value) {
        // not called
    });


## Promise.reject()
The Promise.reject() method returns a Promise object that is rejected with a given reason.

    Promise.reject(new Error('fail')).then(function() {
    // not called
    }, function(error) {
    console.error(error); // Stacktrace
    });