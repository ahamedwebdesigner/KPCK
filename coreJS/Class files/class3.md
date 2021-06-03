##  Async aweite

    async function f() {
        return 1;
    }
    f().then(console.log);

    //or

    async function f() {
        return Promise.resolve(1);
    }
    
    f().then(alert); // 1




//2)

    
async function f() {

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("done!"), 3000)
    });
  
    let result = await promise; // wait until the promise resolves (*)
  
    console.log(result); // "done!"
  }
  
  f();

  //