var http = require('http');
var fs = require('fs');
var server = new http.Server();

server.listen(8000);

server.on('request', function(request, response) {
  var url = require('url').parse(request.url);
  switch (url.pathname) {
    case '' || '/':
      fs.readFile('./index.html', function(err, content) {
        if (err) {
          response.writeHead(404, { 'Content-Type': 'text/plain; charset="UTF-8"' });
          response.write(err.message);
          response.end()
        } else {
          response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
          response.write(content);
          response.end()
        }
      });
      break;
    default:
      var filename = url.pathname.substring(1);
      var type = getType(filename.substring(filename.lastIndexOf('.') + 1));
      fs.readFile(filename, function(err, content) {
        if (err) {
          response.writeHead(404, { 'Content-Type': 'text/plain; charset="UTF-8"' });
          response.write(err.message);
          response.end()
        } else {
          response.writeHead(200, { 'Content-Type': type });
          response.write(content);
          response.end()
        }
      });
      break
  }
});

function getType(endTag) {
  var type = null;
  switch (endTag) {
    case 'html':
      type = 'text/html; charset=UTF-8';
      break;
    case 'js':
      type = 'application/javascript; charset="UTF-8"';
      break;
    default:
      type = 'application/octet-stream';
      break
  }
  return type
}