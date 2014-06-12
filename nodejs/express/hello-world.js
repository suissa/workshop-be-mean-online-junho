// requisitando o módulo do Express
var express = require('express');

// criando nosso servidor
var app = express();

// rota para /hello utilizando o verbo GET do HTTP
app.get('/hello', function(req, res){
   var body = '<h1>Hello World</h1>';
   // setando cabeçalho de tipo
   // res.setHeader('Content-Type', 'text/html');
   // seto co cabeçalho de tamanho
   // res.setHeader('Content-Length', body.length);
   // fechar a resposta enviando body
   // res.end(body); 

   // Também pode se escrever dessa forma
   // A função send já setará o cabeçalho corretamente
   // http://nodejsbrasil.com.br/2013/10/09/qual-a-diferenca-entre-res-write-res-send-e-res-json-express/
   res.send(body);
});

// Vamos criar uma API REST utilizando nosso CRUD
// Create - POST
// Retrieve - GET
// Update - PUT
// Delete - DELETE

app.listen(3000);