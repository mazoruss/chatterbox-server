var express = require('express');

var app = express();

var handler = require('./request-handler2');

app.options('/classes/messages', handler.requestHandler);
app.get('/classes/messages', handler.requestHandler);
app.post('/classes/messages', handler.requestHandler);

app.use(express.static('/Users/student/Desktop/2016-09-chatterbox-server/client/client/'));

app.listen(3005, function() {
  console.log('hi i am listening');
});