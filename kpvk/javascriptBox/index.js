console.log("script started---------------->");
const fetch = require("node-fetch");




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


console.log("script ended------------------>");