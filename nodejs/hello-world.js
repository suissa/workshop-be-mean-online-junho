var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});

  var url = request.url;
  response.write(url);
  console.log(url);

  response.end();
}).listen(3000);
console.log('Server running at http://localhost:3000/');


