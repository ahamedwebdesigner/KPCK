






## onclicking make ajax reques

 var stage = document.getElementById('stage');
    var loadDataButton = document.getElementById('getUsers');

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
           if (xmlhttp.status == 200) {
               //document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
               console.log('Ajax request compleaded !');
               var data = JSON.parse(xmlhttp.responseText);
               console.log(typeof xmlhttp.responseText);
               console.log(typeof data);
               console.log( data);
           }
           else if (xmlhttp.status == 400) {
            console.error('There was an error 400');
           }
           else {
            console.info('something else other than 200 was returned');
           }
        }
    };

     loadDataButton.addEventListener("click",()=>{
        // xmlhttp.open("GET", '<%= data_url %>', true);
        // xmlhttp.send();
     });