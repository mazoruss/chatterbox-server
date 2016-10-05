var fs = require('fs');
var path = require('path');
// var bodyParser = require('bodyParser');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

// Set up the headers and body

var actions = {
  GET: function(request, response, responseBody ) {
    response.status(200);
    fs.readFile('messages.txt', (err, data) => {
      responseBody.results = JSON.parse(data);
      response.end(JSON.stringify(responseBody));
    });
  }, 
  POST: function(request, response, responseBody) {
    statusCode = 201;
    
    fs.readFile('messages.txt', (err, data) => {
      //Get the currently stored messages
      // console.log('req body', request.body);
      var messageData = JSON.parse(data.toString());
      var newMessage = JSON.parse(Object.keys(request.body)[0]);

      newMessage.createdAt = new Date();
      
      //Add the new message to the messages array and write it to the file
      messageData.unshift(newMessage);
      fs.writeFile('messages.txt', JSON.stringify(messageData), (err) => {
      });
      response.end();
    });
  },
  OPTIONS: function(request, response, responseBody) {
    response.status(200);

    fs.readFile('messages.txt', (err, data) => {
      responseBody.results = JSON.parse(data);
      response.end(JSON.stringify(responseBody));
    });
  }
};

var requestHandler = function(request, response) {
  

  var responseBody = {
    method: request.method,
    url: request.url,
    results: []
  };

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  var action = actions[request.method];
  action(request, response, responseBody);

};


exports.requestHandler = requestHandler;