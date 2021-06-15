# history of javascript ?

JavaScript is a programming language that was created at Netscape as a scripting tool to manipulate web pages inside their browser, Netscape Navigator.

Part of the business model of Netscape was to sell Web Servers, which included an environment called Netscape LiveWire that could create dynamic pages using server-side JavaScript. 

Unfortunately, Netscape LiveWire wasn't very successful and server-side JavaScript wasn't popularized until recently
Node.js was the timing. Just a few years earlier, JavaScript had started to be considered as a more serious language

JavaScript engines also became considerably better as many browsers competed to offer users the best performance. Development teams behind major browsers worked hard to offer better support for JavaScript and find ways to make JavaScript run faster. 

 The engine that Node.js uses under the hood, V8 (also known as Chrome V8 for being the open-source JavaScript engine of The Chromium Project), improved significantly due to this competition.

# what is Node.js ?
Node.js is an open-source and cross-platform JavaScript runtime environmen
Node.js runs the V8 JavaScript engine, the core of Google Chrome, outside of the browser
A Node.js app runs in a single process, without creating a new thread for every request
Node.js performs an I/O operation, like reading from the network, accessing a database or the filesystem, instead of blocking the thread and wasting CPU cycles waiting, Node.js will resume the operations when the response comes back.
In Node.js the new ECMAScript standards can be used without problems, as you don't have to wait for all your users to update their browsers 
more than 1,000,000 open source packages you can freely use


# how to create httpserver
- http server can be created using http module
- import the module and create server using createServer() method
- add prot and host to the server to listen

    const http = require('http')

    const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res..end('Hello World!\n')
    })

    server.listen( process.env.PORT, '127.0.0.1', () => console.log(`Server running `));



# Node.js Event emitter