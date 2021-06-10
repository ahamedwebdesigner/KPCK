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