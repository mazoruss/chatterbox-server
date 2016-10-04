var fs = require('fs');
var path = require('path');
/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

// Set up the headers and body

var requestHandler = function(request, response) {
  
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';

  var responseBody = {
    headers: headers,
    method: request.method,
    url: request.url,
    results: []
  };

  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var str = '';
  //Create the status codes
  var statusCode = 404;

  
  if (request.url === '/classes/messages' && (request.method === 'GET' || request.method === 'OPTIONS')) {
    //===================================
    //============Get request============
    //===================================
    statusCode = 200;
    response.writeHead(statusCode, headers);

    fs.readFile('messages.txt', (err, data) => {
      //Get the currently stored messages
      console.log('_rc', response._responseCode);
      var messageData = JSON.parse(data);

      responseBody.results = messageData;
      response.end(JSON.stringify(responseBody));
    });


  } else if (request.url === '/classes/messages' && request.method === 'POST') {
    //===================================
    //===========Post request============
    //===================================
    statusCode = 201;
    //Get request and turn it into a string
    request.on('data', function(data) {
      str += data;
    });
    
    request.on('end', function() {
      fs.readFile('messages.txt', (err, data) => {
        
        //Get the currently stored messages
        var messageData;
        messageData = JSON.parse(data.toString());
        var newMessage = JSON.parse(str);
        newMessage.createdAt = new Date();
        
        //Add the new message to the messages array and write it to the file
        messageData.push(newMessage);
        fs.writeFile('messages.txt', JSON.stringify(messageData), (err) => {
        });

        response.writeHead(statusCode, headers);
        response.end();
      });

    });

  } else {
    response.writeHead(statusCode, headers);
    response.end();
  }

};


exports.requestHandler = requestHandler;