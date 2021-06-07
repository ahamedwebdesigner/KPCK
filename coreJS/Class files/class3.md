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


### Async a waite topic three

await new Promise(resolve => setTimeout(resolve, 1000));
await new Promise(resolve => setTimeout(() => { resolve({ data: 'your return data'}) }, 1000));


