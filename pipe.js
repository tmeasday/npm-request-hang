var http = require('http');
var request = require('request');

var PORT = 8081;
var URL = 'https://newsela-test-files-f331e.s3.amazonaws.com/article_media/2015/03/obama-stem-5c6e9abc.jpg';

var pipe = function(response) {
  var stream = request.get(URL);
  console.log('Streaming');
  stream.pipe(response);

  stream
    .on('end', function() { console.log('Stream ended'); })
    .on('close', function() { console.log("Stream closed"); })
    .on('error', function() { console.log("Stream ERROR"); });
};


http.createServer(function(req, res) {
  pipe(res);
}).listen(PORT);
