# working with promises and Ajax

## simple ajax call using javascript

     const XmlHttprequestObj = new XMLHttpRequest();
        XmlHttprequestObj.onreadystatechange = function (e) {
            if (this.readyState === 4) {
                if (this.status == 200) {
                    console.log(XmlHttprequestObj.responseText);
                } else {
                    console.log("Error Occured");
                }
            }
        }
        XmlHttprequestObj.open("GET", '/ajax/getName', true);
        XmlHttprequestObj.send();


await new Promise(resolve => setTimeout(resolve, 5000));


## Example 1: woraking with Ajax requests with out promis
### using call backs
- created ajax call to get name
- called ajax in a call back




          //3) second request
          const XmlHttprequestObjMessage = new XMLHttpRequest();
          XmlHttprequestObjMessage.onreadystatechange = function (e) {
            if (this.readyState === 4) {
                if (this.status == 200) {
                // 4) if all is well update
                  detailsPlace.innerHTML = XmlHttprequestObjMessage.responseText;
                 loadDetailsBtn.innerHTML = 'Load User Details';


                 XmlHttprequestObjMessage
               
                } else {
                    console.log("Error Occured");
                }
            }
        }
      


        //2) second request
        const XmlHttprequestObjUppercase = new XMLHttpRequest();
        XmlHttprequestObjUppercase.onreadystatechange = function (e) {
            if (this.readyState === 4) {
                if (this.status == 200) {
                // 4) if all is well update
                //   detailsPlace.innerHTML = XmlHttprequestObjUppercase.responseText;
                //  loadDetailsBtn.innerHTML = 'Load User Details';

                XmlHttprequestObjMessage.open("GET", '/ajax/getMessage'+"?name="+XmlHttprequestObjUppercase.responseText, true);
                XmlHttprequestObjMessage.send();

               
                } else {
                    console.log("Error Occured");
                }
            }
        }
      


        // 1) selection buttion and place hoder to update result form server
        var loadDetailsBtn = document.getElementById('LoadNameBtn');
        var detailsPlace = document.getElementById('display-name-div');

        //  2) creating xmlhttp request
        const XmlHttprequestObj = new XMLHttpRequest();
        XmlHttprequestObj.onreadystatechange = function (e) {
            if (this.readyState === 4) {
                if (this.status == 200) {
                // 4) if all is well update
                  //detailsPlace.innerHTML = XmlHttprequestObj.responseText;

                  XmlHttprequestObjUppercase.open("GET", '/ajax/getModifiedName'+"?name="+XmlHttprequestObj.responseText, true);
                  XmlHttprequestObjUppercase.send();

                } else {
                    console.log("Error Occured");
                }
            }
        }
      
  

        // 3) add event listner to button
        loadDetailsBtn.addEventListener("click",(e)=>{

            loadDetailsBtn.innerHTML = 'Loading............';
            XmlHttprequestObj.open("GET", '/ajax/getName', true);
            XmlHttprequestObj.send();
        });


### Using Ajax



        function makeAjaxcall(method,url,asinc){
            return new Promise((resolve,reject)=>{
                const xmlHttpReq = new XMLHttpRequest();
                xmlHttpReq.onreadystatechange = function (e) {
                    if (this.readyState === 4) {
                        if (this.status == 200) {
                            resolve(this.response);
                        } else {
                            reject(this.status);
                        }
                    }
               }
               xmlHttpReq.open(method, url,asinc);
               xmlHttpReq.send();


            });
        }

     // 1) selection buttion and place hoder to update result form server
        var loadDetailsBtn = document.getElementById('LoadNameBtn');
        var detailsPlace = document.getElementById('display-name-div');

          // 3) add event listner to button
          loadDetailsBtn.addEventListener("click",(e)=>{
                loadDetailsBtn.innerHTML = 'Loading............';
                let promis1 = makeAjaxcall("GET",'/ajax/getName',true);
                promis1.then((response)=>{
                    console.log(response);
                    makeAjaxcall("GET",'/ajax/getModifiedName'+"?name="+response,true)
                    .then((response)=>{
                        console.log(response);
                        makeAjaxcall("GET",'/ajax/getMessage'+"?name="+response,true)
                        .then((response)=>{
                            console.log(response);
                            return response;
                        }).then((response)=>{
                            detailsPlace.innerHTML = response;
                        });
                    })
                }).finally(() =>loadDetailsBtn.innerHTML = 'Load User Details');
                
            });
