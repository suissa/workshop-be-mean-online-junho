var http = require("http");
var _beer = require("./controllers/beer");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});

  var url = request.url;
  // mensagem que será enviada para o client
  var msg = '';
// criando as rotas para as funcionalidades do Mongoose
  switch(url){
    case '/create':
      _beer.create(request, response);
      break;
    case '/retrieve': 
      _beer.retrieve(request, response);
      break;
    case '/update': 
      _beer.update(request, response);
      break;
    case '/delete': 
      _beer.delete(request, response);
      break;
    default:
      response.end('Rota não encontrada', 'UTF-8');
  }


}).listen(3000);
console.log('Server running at http://localhost:3000/');


