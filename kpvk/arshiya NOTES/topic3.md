
## 1) async function giges promis by default for the returning value

    async function longRun(){
        //console.log("Hellow All");
        return "Arshiya";
        return Promise.resolve("Arshiya");
    }

    let details = longRun();



    console.log(details);
    console.log(typeof details);
    console.log(Object.prototype.toString.call(details))
 
## 2) consuming async function



// 1) consuming async value 
async function longRun(){
    console.log("        Async started---------------->");
    return "Arshiya";
    //return Promise.resolve("Arshiya");
    console.log("        Async ended---------------->");
}

let details = longRun();


details.then((res)=>console.log(res))


## 