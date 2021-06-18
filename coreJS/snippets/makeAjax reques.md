# syntax

    httpRequest = new XMLHttpRequest()
    httpRequest.open('GET', 'http://www.example.org/some.file')
    httpRequest.send()

   ## Simple POST request

    httpRequest = new XMLHttpRequest()
    httpRequest.open('POST', 'http://www.example.org/some/endpoint')
    httpRequest.send('some data')



# Example:  Make Ajax request with vJS
   
    <script type="text/javascript">
    function loadXMLDoc() {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
            }
            else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            }
            else {
                alert('something else other than 200 was returned');
            }
            }
        };

        xmlhttp.open("GET", "ajax_info.txt", true);
        xmlhttp.send();
    }
    </script>


# With jQuery:

    $.ajax({
        url: "test.html",
        context: document.body,
        success: function(){
        $(this).addClass("done");
        }
    });

## Example 1 :


    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();


# using Fetch

fetch('path-to-the-resource-to-be-fetched')
  .then((response) => {
  
    // Code for handling the response
  })
  .catch((error) => {
  
    // Code for handling the error
  });

  # Axios: 
  Axios is a Javascript library used to make HTTP requests from node.js or XMLHttpRequests from the browser and it supports the Promise API that is native to JS ES6

    axios.get('url')
    .then((response) => {
        // Code for handling the response
    })
    .catch((error) => {
        // Code for handling the error
    })


EXample1: 



const options = {
  url: 'http://localhost/test.htm',
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  },
  data: {
    a: 10,
    b: 20
  }
};

axios(options)
  .then(response => {
    console.log(response.status);
  });



## using fetch


const url = 'http://localhost/test.htm';
const options = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  },
  body: JSON.stringify({
    a: 10,
    b: 20
  })
};

fetch(url, options)
  .then(response => {
    console.log(response.status);
  });

# Response timeout : axios

axios({
  method: 'post',
  url: '/login',
  timeout: 4000,    // 4 seconds timeout
  data: {
    firstName: 'David',
    lastName: 'Pollock'
  }
})
.then(response => {/* handle the response */})
.catch(error => console.error('timeout exceeded'))


# Response timeout : fetch


const controller = new AbortController();
const options = {
  method: 'POST',
  signal: controller.signal,
  body: JSON.stringify({
    firstName: 'David',
    lastName: 'Pollock'
  })
};  
const promise = fetch('/login', options);
const timeoutId = setTimeout(() => controller.abort(), 4000);

promise
  .then(response => {/* handle the response */})
  .catch(error => console.error('timeout exceeded'));



  # JSON data transformation


    // axios
    axios.get('https://api.github.com/orgs/axios')
    .then(response => {
        console.log(response.data);
    }, error => {
        console.log(error);
    });

    // fetch()
    fetch('https://api.github.com/orgs/axios')
    .then(response => response.json())    // one extra step
    .then(data => {
        console.log(data) 
    })
    .catch(error => console.error(error));

# HTTP interceptors


    axios.interceptors.request.use(config => {
    // log a message before any HTTP request is sent
    console.log('Request was sent');

    return config;
    });

    // sent a GET request
    axios.get('https://api.github.com/users/sideshowbarker')
    .then(response => {
        console.log(response.data);
    });

    