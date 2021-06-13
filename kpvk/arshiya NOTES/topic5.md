### Using promises with ajax jquery


    function getData(url,data) {
        return new Promise((resolve, reject) => {
            $.ajax({
            url: url,
            type: 'POST',
            data:data,
            success: function (data) {
                resolve(data)
            },
            error: function (error) {
                reject(error)
            },
            })
        })
    }

- making ajax request

    getData('http://localhost:3000/ajax/postjson',{name: "mustaq",wife: 'Arshiya Ahamed'})
    .then((data) => {
        console.log(data)
    
    }).catch((error) => {
        console.log(error)
    });

- NOTE: asyncronous funciton is called when then method is called on promis

## multiple ajax requests


     function getData(url,type,data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: url,
                    type: type,
                    data:data,
                    success: function (data) {
                        resolve(data)
                    },
                    error: function (error) {
                        reject(error)
                    },
                })
            })
        }
         
        let userData = getData(' http://localhost:3000/ajax/getName','GET',{});
        userData.then((data)=>{
            let modifiedData = getData(' http://localhost:3000/ajax/getModifiedName','GET',{name:data})
            modifiedData.then((mData)=>{
                let MessageData = getData(' http://localhost:3000/ajax/getMessage','GET',{name:mData})
                MessageData.then((mes)=>console.log(mes))
            });

        });
        
using async and await and jquery


        (async()=>{
         
            let messageData;
            try {
                let userData = await getData(' http://localhost:3000/ajax/getName','GET',{});
                let modifiedData  = await getData(' http://localhost:3000/ajax/getModifiedName','GET',{name:userData});
                 messageData  = await getData(' http://localhost:3000/ajax/getMessage','GET',{name:modifiedData});
              
            } catch (error) {
                console.log(error.responseText)
                
            }
            console.log(messageData);

        })();




## Multiple ajax request using 

    function getData(url,data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                url: url,
                type: 'POST',
                data:data,
                success: function (data) {
                    resolve(data)
                },
                error: function (error) {
                    reject(error)
                },
                })
            })
            }

    (async()=>{
        try {
            let request = await getData('http://localhost:3000/ajax/postjson',{name: "mustaq",wife: 'Arshiya Ahamed'});
           let request2 = await getData('http://localhost:3000/ajax/postjsonNodata',{name: "mustaq",wife: 'Arshiya Ahamed'});
        } catch(e) {
            console.log("in the catch block");
            console.log(e);
            console.log(e.status);
            console.log(e.statusText);
        }
    })();


## Multiple ajax request using 