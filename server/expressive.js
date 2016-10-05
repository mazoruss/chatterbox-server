var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var handler = require('./request-handler2');

//app.use(function1)
var addHeader = function(req, res, next) {

  res.set('access-control-allow-origin', '*');
  res.set('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.set('access-control-allow-headers', 'content-type, accept');
  res.set('access-control-max-age', 10 );
  res.set('Content-Type', 'application/json');

  next();
};

app.use(express.static('/Users/student/Desktop/2016-09-chatterbox-server/client/client/'));

app.use(addHeader);
app.use(bodyParser());
app.get('/classes/messages', handler.requestHandler);
app.post('/classes/messages', handler.requestHandler);
// app.options('/classes/messages', handler.requestHandler);


app.listen(3005, function() {
  console.log('You\'ve been hacked!');
});



  // var responseBody = {
  //   headers: headers,
  //   method: request.method,
  //   url: request.url,
  //   results: []
  // };