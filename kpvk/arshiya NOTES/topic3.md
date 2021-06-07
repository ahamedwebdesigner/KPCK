
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


## 3) calling 3 asunc functions 




async function getName(){
   //  setTimeout(()=>{ return "Arshiya"},3000);
     return new Promise((resolve) => {
           setTimeout(() => resolve("Mustaq"), 3000)
     });
}

async function modifyName(name){
    //  setTimeout(()=>{ return "Arshiya"},3000);
      return new Promise((resolve) => {
            setTimeout(() => resolve(name.toLocaleUpperCase()), 3000)
      });
 }

 
 async function message(name){
    //  setTimeout(()=>{ return "Arshiya"},3000);
      return new Promise((resolve) => {
            setTimeout(() => resolve("Hellow "+ name +" !"), 3000)
      });
 }



(async()=>{
    let name = await getName();
    let newName = await modifyName(name);
    let data = await message(newName);
    console.log("->"+data)
   
})();