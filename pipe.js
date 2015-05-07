var http = require('http');
var request = require('request');

// Make the problem obvious
http.globalAgent.maxSockets = 1;

var PORT = 8081;
var URL = 'http://newsela-test-files-f331e.s3.amazonaws.com/article_media/2015/03/obama-stem-5c6e9abc.jpg';

var pipe = function(response) {
  var stream = request.get(URL);
  console.log('Streaming');

  stream
    .on('end', function() { console.log('Stream ended'); })
    .on('close', function() { console.log('Stream closed'); })
    .on('error', function() { console.log('Stream ERROR'); });

  var output = stream.pipe(response);
  output
    .on('end', function() { console.log('Output ended'); })
    .on('close', function() { console.log('Output closed'); })
    .on('error', function() { console.log('Output ERROR'); });

// With this line commented in the issue is fixed
//  output.on('close', function() { stream.abort(); });
};


http.createServer(function(req, res) {
  pipe(res);
}).listen(PORT);