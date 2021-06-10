
npm i node-fetch --save
then put the line below at the top of the files where you are using the fetch API:

const fetch = require("node-fetch");



## using fetch APi

    fetch('http://localhost:3000/ajax/getjson')
    .then(response => response.json())
    .then(data => console.log(data));


    /*
    let resp = fetch('http://localhost:3000/ajax/getjson') ;
    console.log("1)"+ resp);  // pending 
    resp.then(response =>{
        console.log("2)"+response.json())
    })

    console.log("3)"+resp);

    */

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

- using fetch api with error handling 

        const asyncGetCall = async () => {
            try {
                const response = await fetch('http://localhost:3000/ajax/getjson');
                if(response.status== 200 && response.statusText == 'OK' ){
                    const data = await response.json();
                    console.log(data);
                }else{
                    throw new Error( response.statusText);
                }
            } catch(error) {
            // enter your logic for when there is an error (ex. error toast)
                console.log(error)
            } 
        }
        asyncGetCall()


## making post request using fetch
        const rawResponse =  fetch('http://localhost:3000/ajax/postjson', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: "mustaq",wife: 'Arshiya Ahamed'})
        }).then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.log(error)
        })

- using await syntax

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

client code 

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


- note: Headers object is not present in node envirnment
- it is only present in brouser envirnment
    
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



## file uploading using fetch api and formdata 

- uploading image using form data and multer

librareis

    npm install --save multer


Import statements

    var multer  = require('multer')
    //var upload = multer({ dest: './uploads' })


        var storage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, './uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);  
             //cb(null, file.fieldname + '-' + Date.now())
        }
     });

    var upload = multer({ storage: storage });




server side code for uploading single image

    router.post('/fileUPload',  upload.single('avatar'),function(req, res, next) {
        console.log("=========================================="); 
        console.log(req.file, req.body);
        res.json({ message: 'Data submitted' });
        console.log("=========================================="); 
    
    });


server side code for uploading multiple images

    router.post('/fileUPload',  upload.array('avatar'),function(req, res, next) {
        console.log("=========================================="); 
        console.log(req.file, req.body);
        
        res.json({ message: 'Data submitted' });
        console.log("=========================================="); 
    
    });


brouser side code


//HTML
---------

    
    <div class="jumbotron">
        <div class="container">
            <button class="btn btn-primary btn-lg" id="uploadFile">upload File</button>
        
        <h1 class="display-3" id="display-name-div"></h1>

        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <form id="myForm" name="myForm" action="/ajax/fileUPload" method="post"  enctype="multipart/form-data">
                    <div class="form-group">
                        <label for="userfile">Upload file:</label>
                        <input type="file" id="userfile" name="userfile" multiple>
                    </div>
            
                </form>
            </div>
        </div>
    </div>

javascript code 

- when ever we are uploding file using treditional html form submittion then we need form tag  as shone above
- when we are submittion using fomr data api no need for form and encript type 

    <script>
        window.addEventListener('load',init);
        function init(){

            let uploadButton = document.getElementById('uploadFile');
            uploadButton.addEventListener('click',(event)=>{
                event.preventDefault();
                
                const formData = new FormData();
                const fileField = document.querySelector('input[type="file"]');
                formData.append('avatar', fileField.files[0]);


                fetch('/ajax/fileUPload', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(result => {
                    console.log('Success:', result);
                })
                .catch(error => {
                    console.error('Error:', error);
                });


                console.log("hellow all");
            });
        

        }
    </script>


### form data using html form
- get all form fields data using form 

    let myForm = document.getElementById('myForm');
    let formData = new FormData(myForm);


Example code 


      <form id="myForm" name="myForm" action="/ajax/fileUPload" method="post"  enctype="multipart/form-data"> 
                <div class="form-group">
                    <label for="userfile">Upload file:</label>
                    <input type="file" id="userfile" name="avatar" multiple>
                  </div>
                  <div class="form-group">
                    <label for="userfile">Upload file:</label>
                    <input type="text" id="desc" name="desc" >
                  </div>
            </form>

javascript code

    function init(){

        let uploadButton = document.getElementById('uploadFile');
        uploadButton.addEventListener('click',(event)=>{
            event.preventDefault();
            
       
            const formData = new FormData(document.getElementById('myForm'));

            fetch('/ajax/fileUPload', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result);
            })
            .catch(error => {
                 console.error('Error:', error);
            });


            console.log("hellow all");
        });
    

     }












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