
  







    var elements = document.getElementsByClassName("formVal");
    var formData = new FormData(); 
    for(var i=0; i<elements.length; i++)
    {
        formData.append(elements[i].name, elements[i].value);
    }
    var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function()
        {
            if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
            {
                alert(xmlHttp.responseText);
            }
        }
        xmlHttp.open("post", "server.php"); 
        xmlHttp.send(formData); 


        // part1: understanding excuition of JS

/*


*/


const second=()=>{
    console.log("second stareed");
    console.log("second ended");
    
    // setTimeout(()=>{
    //     console.log("second stareed");
    //     console.log("second ended");
    // },2000)
  
}

const first=()=>{
    console.log("first stareed");
    second();
    console.log("first ended");
}

first();



