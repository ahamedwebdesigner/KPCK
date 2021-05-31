console.log("script started---------------->");
/*
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

////////// using promis 

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

*/




/*

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

*/




console.log("script ended------------------>");