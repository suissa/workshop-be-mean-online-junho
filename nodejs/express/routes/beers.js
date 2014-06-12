var express = require('express');
var router = express.Router();
// requisitando nosso controller
var beer = require('../controllers/beer');

// crio a rota com GET para /beers
router.get('/', function(req, res){
  // chamo a funcão de retrieve do meu controller
  // passando req e res como parametro
  beer.retrieve(req, res);
  console.log('/retrieve');
});

// crio a rota com POST para /beers
router.post('/', function(req, res){
  // chamo a funcão de retrieve do meu controller
  // passando req e res como parametro
  beer.create(req, res);
  console.log('/create');
});
// Para testarmos nossa API de JSON irei utilizar o POSTMAN
// uma extensão do Chrome para requisições HTTP

// Na mesma rota / eu vou tanto poder buscar as cervejas
// Como vou poder criar as cervejas

// Vamos começar a integrar com nosso CRUD de cervejas
// Para isso precisamos instalar o mongoose 
// Depois copiamos nossos arquivos passados
// das pastas controllers e models

module.exports = router;
