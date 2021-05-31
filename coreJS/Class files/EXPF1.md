# working syncronous code and Asyscronous excuition

### 1) javascript is syncronous , blocking and single threaded programing language
-------------------------------------

    <body onload="main()">
    <h1> syncronus blocking language</h1>

    <script>
       function main(){
            console.log("hellow");
            setTimeout(()=> alert("hellow"),0)
            console.log("hellow");
            console.log("hellow");
            console.log("hellow");
            console.log("hellow");
            console.log("hellow");
        }

        </script>
    </body>



###  Higher order function

def: any function which takes another function as an argumnet is knone as higher order function


             function addition(a,b){
               return a+b;
            }
            function addFive(x,addref){
                return addref(x,5);
            }
            function addSix(x,addref){
                return addref(x,6);
            }


            console.log(addFive(10,addition));
            console.log(addSix(10,addition));

            EXP: in the above code appFive and appSix are higher order functions


### call back hell

Nesting call back in another callback is known as callback hell

--------------------------------------------------------------------

            
    var id =20

    var getaddressxhttp = new XMLHttpRequest();
    getaddressxhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //this.responseText  ==> contains information about employee name
        var getemployesxhttp = new XMLHttpRequest();
        getemployesxhttp.onreadystatechange=()=>{
            if (this.readyState == 4 && this.status == 200) {
            //this.responseText  ==> contains information about employee address
            }

        }

        }
    };
    getaddressxhttp.open("POST", "ERP/user/getinfo.com", true);
    getaddressxhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    getaddressxhttp.send("empid="id);

------------------------------------------------
## about functions

1) functions are individual reusable Code
2) call backs
3) functions as event handlers







# promis

### what is promis ?
- A Promise is a special JavaScript object. 
- It produces a value after an asynchronous (aka, async) operation completes successfully, or an error if it does not complete successfully due to time out, network error, and so on.
- A Promise is an object representing the eventual completion or failure of an asynchronous operation.
- promise may be used for an asynchronous operation




### why we habe to use promisis instead of callbacks ?

- But, a callback is not a special thing in JavaScript. 
- It is a regular function that produces results after an asynchronous call completes (with success/error)
- asynchronous tasks / operations  means that the resulst fo the operation will be  in the future, not right now.
- anyuc tasns example: like network calls, or uploading/downloading things, talking to databases, and so on
- we can user callbacks for such type of operations but there is a huge downside to them
- we may have one callback inside another callback that's in yet another callback and so on
- which makes callback hell code become very complex while understanding and writing


### How to make promis in javascript ?

    let executorFunction = function(resolve, reject) {    
        // Make an asynchronous call and either resolve or reject
    };
    let promise = new Promise(executorFunction);

### understanding promis?

- The new Promise() constructor returns a promise object
- As the executor function needs to handle async operations
-  the returned promise object should be capable of informing when the execution has been started, completed (resolved) or retuned with error (rejected)



A promise object has the following internal properties:

##### state – This property can have the following values:
1. pending: Initially when the executor function starts the execution.
2. fulfilled: When the promise is resolved.
3. rejected: When the promise is rejected.
4. settled - Has fulfilled or rejected

##### result – This property can have the following values:

1. undefined: Initially when the state value is pending.
2. value: When resolve(value) is called.
3. error: When reject(error) is called.

This means that we will be able to inspect the state and result property values using the debugger tool


# Example : how to make various types of pormis
### Resolve promis sintax

    // resolve promis
    let resolvePromise = new Promise(function(resolve, reject) {
        resolve("I am done");
    });

    // reject promiss

    let rejectPromise = new Promise(function(resolve, reject) {
        reject(new Error('Something is not right!'));
    });

    console.log(resolvePromise);
    console.log(rejectPromise);

# getting promis information



    // util = require('util');
    // var promise1 = new Promise (function (resolve) {});
    // var promise2 = new Promise (function (resolve) {resolve ('foo');});
    // var promise3 = new Promise (function (resolve,rejected) {rejected ('rejected value');});

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





### handle a Promise

- A Promise uses an executor function to complete a task (mostly asynchronously). 
- A consumer function (that uses an outcome of the promise) should get notified when the executor function is done with either resolving (success) or rejecting (error).


The handler methods, .then(), .catch() and .finally(), help to create the link between the executor and the consumer functions so that they can be in sync when a promise resolves or reject

## <<sintax>> Then
 The then() method is used to schedule a callback to be executed when the promise is successfully resolved.
    
    promiseObject.then(onFulfilled, onRejected);

Example: 

    promise.then(
    (result) => { 
        console.log(result);
    },
    (error) => { 
        console.log(error);
    }
    );

If you are interested only in successful outcomes

    promise.then(
        (result) => { 
            console.log(result);
        }
    );

If you are interested only in the error outcome, you can pass null for the first argument,

    promise.then(
    null,
    (error) => { 
        console.log(error)
    }
    );

catch() Promise error 

      promise.catch(error => console.log(error));

.finally() Promise

    promise.finally(() => {
        loading = false;
        console.log(`Promise Settled and loading is ${loading}`);
    }).then((result) => {
        console.log({result});
    }).catch((error) => {
        console.log(error)
    });




### promis example
obser  in brouser envirnment and observer in console

    // observer in  learnJS
    //let completed = true;
    let completed = false;

    let learnJS = new Promise(function (resolve, reject) {
        setTimeout(() => {
            if (completed) {
                resolve("I have completed learning JS.");
            } else {
                reject("I haven't completed learning JS yet.");
            }
        }, 3 * 1000);
    });


### Example 1 : make Ajax call 
-------------------------------------------------------------------------------

        function makePromise(completed) {
            return new Promise(function (resolve, reject) {
                setTimeout(() => {
                    if (completed) {
                        resolve("I have completed learning JS.");
                    } else {
                        reject("I haven't completed learning JS yet.");
                    }
                }, 3 * 1000);
            });
        }

        let learnJS = makePromise(true);

        learnJS
            .then(success => console.log(success))
            .catch(reason => console.log(reason))
            .finally(() => createApp());


        // handling only error
        let masterJS = makePromise(false);

        masterJS.then(
            undefined,
            reason => console.log(reason)
        );
### example: Promises are Asynchronous

    console.log('before asking Mom'); // log before

    let learnJS = makePromise(true);

        learnJS
            .then(success => console.log(success))
            .catch(reason => console.log(reason))
            .finally(() => createApp());

    console.log('after asking mom'); // log after

### Example2:  promis chaining
---------------------------

    // in brouser envirnment and observer in console
    // observer in  learnJS
    let completed = true;

    let learnJS = new Promise(function (resolve, reject) {
        setTimeout(() => {
            if (completed) {
                resolve("I have completed learning JS.");
            } else {
                reject("I haven't completed learning JS yet.");
            }
        }, 3 * 1000);
    });

    learnJS.then(result =>{
        console.log(result);
        return result+"some thing extrea done";
    }).then(result=>{
        console.log(result);
    });


### Multiple Promises
------------------------------------------------
Apart from the handler methods (.then, .catch, and .finally), 
there are six static methods available in the Promise AP

Promise.all
Promise.any
Promise.allSettled
Promise.race
Promise.resolve
Promise.reject


####  Promise.all()
-----------------------------------------------------

Promise.all([promises]) accepts a collection (for example, an array) of promises as an argument and executes them in parallel.

- This method waits for all the promises to resolve and returns the array of promise results. 
- If any of the promises reject or execute to fail due to an error, all other promise results will be ignored.


    // step1: create promis 

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


    let promis1 = MakePromis(2,true,'First promis resolved');



    promis1
    .then(success => console.log(success))
    .catch(reason => console.log(reason))
    .finally(() => console.log("promis1 finally called "));

    // step two


    
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



## example XXX: promis with ajax request


function load(url) {
    return new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest();

        request.onreadystatechange = function (e) {
            if (this.readyState === 4) {
                if (this.status == 200) {
                    resolve(this.response);
                } else {
                    reject(this.status);
                }
            }
        }
        request.open('GET', url, true);
        request.send();
    });
}

let promise = load(ALL_POKEMONS_URL);

promise.then(result => {
    let data = JSON.parse(result);
    return data;
});


## sending data to the javascript form expressjs

    var inJavascript = JSON.parse("<%= myVar %>");
    var json = JSON.parse('<%- JSON.stringify(json) %>');










    function getPromise(URL) {
  let promise = new Promise(function (resolve, reject) {
    let req = new XMLHttpRequest();
    req.open("GET", URL);
    req.onload = function () {
      if (req.status == 200) {
        resolve(req.response);
      } else {
        reject("There is an Error!");
      }
    };
    req.send();
  });
  return promise;
}