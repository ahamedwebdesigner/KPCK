
npm i node-fetch --save
then put the line below at the top of the files where you are using the fetch API:

const fetch = require("node-fetch");



## using fetch APi

    fetch('http://localhost:3000/ajax/getjson')
    .then(response => response.json())
    .then(data => console.log(data));


## using fetch APi error handling 

    fetch('http://localhost:3000/ajax/getjson')
    .then(res => res.json())
    .then(data => {
        // enter you logic when the fetch is successful

        console.log(data)
    })
    .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
    })

### server side code 

    router.get('/getJson', function(req, res, next) {
    // res.json({ user: 'Mustaq Ahamed' });
    return res.status(400).send({
            message: 'This is an error!'
        }); 
                
    });


## best practices to use fetch by using await and async
        const asyncGetCall = async () => {
            try {
                const response = await fetch('http://localhost:3000/ajax/getjson');
                const data = await response.json();
                console.log(data);    // enter you logic when the fetch is successful
            } catch(error) {
            // enter your logic for when there is an error (ex. error toast)
                console.log(error)
            } 
        }

        asyncGetCall()



## making post request using fetch

        (async () => {
        const rawResponse = await fetch('http://localhost:3000/ajax/postjson', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: "mustaq",wife: 'Arshiya Ahamed'})
        });
        const content = await rawResponse.json();

        console.log(content);
        })();



## sending headers to the server

- server side code

    
    router.post('/postjson', function(req, res, next) {

        console.log("---------------------------------");
        // console.log(req.body);
        // console.log((req.headers));
        console.log((req.headers['x-authantication-key']));
        console.log("---------------------------------");
        res.json({ message: 'Data submitted' });
            
    });

- client code 

    (async () => {
        const rawResponse = await fetch('http://localhost:3000/ajax/postjson', {
                 method: 'POST',
                 headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-authantication-key':"abcdefslhlkj6uwyew8e775656"
                },
                body: JSON.stringify({name: "mustaq",wife: 'Arshiya Ahamed'})
            });
            const content = await rawResponse.json();

            console.log(content);
    })();


## Using custom header object



    
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Accept', 'application/json');
        myHeaders.append( 'x-authantication-key',"abcdefslhlkj6uwyew8e775656");





        (async () => {
        const rawResponse = await fetch('http://localhost:3000/ajax/postjson', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({name: "mustaq",wife: 'Arshiya Ahamed'})
        });
        const content = await rawResponse.json();

        console.log(content);
        })();




## Using custom Request  object
   const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Accept', 'application/json');
        myHeaders.append( 'x-authantication-key',"abcdefslhlkj6uwyew8e775656");


        const myRequest = new Request('http://localhost:3000/ajax/postjson', {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({name: "mustaq",wife: 'Arshiya Ahamed'})
        });



        (async () => {
            const rawResponse = await fetch(myRequest);
            const content = await rawResponse.json();
            console.log(content);
        })();


## Referance to the fetch objecct 
- referance to all the possieble alus in fetch 
- most options are not required for simple request

        (async () => {

                // Example POST method implementation:
                async function postData(url = '', data = {}) {
                // Default options are marked with *
                const response = await fetch(url, {
                    method: 'POST',                  // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors',                   // no-cors, *cors, same-origin
                    cache: 'no-cache',              // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin',      // include, *same-origin, omit
                    headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    redirect: 'follow', // manual, *follow, error
                    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify(data) // body data type must match "Content-Type" header
                });
                return response.json(); // parses JSON response into native JavaScript objects
                }

                postData('http://localhost:3000/ajax/postjson', { answer: 42 })
                .then(data => {
                    console.log(data); // JSON data parsed by `data.json()` call
                });


        })();



## file uploading using fetch 
















    <div class="form-group">
            <label for="username">Enter name:</label>
            <input  class="form-control" type="text" id="username" name="username">
          </div>

        <div class="form-group">
            <label for="email">Email address:</label>
            <input type="email" class="form-control" placeholder="Enter email" id="email">
          </div>



          <div class="form-group">
            <label for="pwd">Password:</label>
            <input type="password" class="form-control" placeholder="Enter password" id="pwd">
          </div>

          <div class="form-group">
            <label for="useracc">Enter account number:</label>
            <input class="form-control" type="text" id="useracc" name="useracc">
          </div>

          
          <div class="form-group form-check">
            <label class="form-check-label">
              <input class="form-check-input" type="checkbox"> Remember me
            </label>
          </div>
          


                    let myForm = document.getElementById('myForm');
            let formData = new FormData(myForm);
            formData.append('username', 'Chris');