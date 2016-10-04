var fs = require('fs');
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
  headers['Content-Type'] = 'text/plain';

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

  
  if (request.url === '/classes/messages' && request.method === 'GET') {
    //===================================
    //============Get request============
    //===================================
    statusCode = 200;

    fs.readFile('messages.txt', (err, data) => {
      response.writeHead(statusCode, headers);
      //Get the currently stored messages
      var messageData = JSON.parse(data);
      console.log('messageData', messageData);

      responseBody.results = messageData;
      response.write(JSON.stringify(responseBody));

      response.end();




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
        
        //Add the new message to the messages array and write it to the file
        messageData.push(JSON.parse(str));
        fs.writeFile('messages.txt', JSON.stringify(messageData), (err) => {
        });
      });

    });

  } else if (request.url === '/classes/messages' && request.method === 'OPTIONS') {
    console.log('the request type was options');
  }



  // //Create / send the response
  // 
  // response.write(JSON.stringify(responseBody));
  // response.end();

};


exports.requestHandler = requestHandler;