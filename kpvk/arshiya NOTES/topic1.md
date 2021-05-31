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

