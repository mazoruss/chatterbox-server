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

var requestHandler = function(request, response) {

  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  
  //Create the status codes
  var statusCode = 404;
  
  if (request.url === '/classes/messages' && request.method === 'GET') {
    statusCode = 200;
  } else if (request.url === '/classes/messages' && request.method === 'POST') {
    statusCode = 201;
  }
  
  // Set up the headers and body
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = 'text/plain';

  var responseBody = {
    headers: headers,
    method: request.method,
    url: request.url,
    results: []
  };


  //Create / send the response
  response.writeHead(statusCode, headers);
  response.write(JSON.stringify(responseBody));
  response.end();

};


module.exports = requestHandler;