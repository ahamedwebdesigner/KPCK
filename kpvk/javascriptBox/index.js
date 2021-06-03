console.log("script started---------------->");


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

console.log("script ended------------------>");