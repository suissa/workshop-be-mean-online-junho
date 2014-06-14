var express = require('express');
var router = express.Router();
// requisitando nosso controller
var beer = require('../../controllers/api/beer');

// crio a rota com GET para /beers
// router.get('/', function(req, res){
//   // chamo a funcão de retrieve do meu controller
//   // passando req e res como parametro
//   beer.retrieve(req, res);
// });
router.get('/', beer.retrieve);

// Criar a rota para consultar uma cerveja
// utilizando GET para /beers/:id
// router.get('/:id', function(req, res){
//   // chamo a funcão de retrieve do meu controller
//   // passando req e res como parametro
//   beer.findOne(req, res);
//   // Então preciso criar essa função no meu controller
// });
router.get('/:id', beer.findOne);

// crio a rota com POST para /beers
// router.post('/', function(req, res){
//   // chamo a funcão de retrieve do meu controller
//   // passando req e res como parametro
//   beer.create(req, res);
// });
router.post('/', beer.create);
// router.post('/:id', beer.update);

// crio a rota com PUT para /beers/:id
// o :id é uma variável da nossa rota
// router.put('/:id', function(req, res){
//   // pegarei esse :id em request.params.id
//   // mas usarei ele na minha função de update
//   beer.update(req, res);
// });
router.put('/', function(req, res){
  console.log('ENTREI AQUI PARA ALTERAR BAH!');
});
router.put('/:id', beer.update);

// crio a rota com DELETE para /beers/:id
// router.delete('/:id', function(req, res){
//   // pegarei esse :id em request.params.id
//   // mas usarei ele na minha função de delete
//   beer.delete(req, res);
// });
router.delete('/:id', beer.delete);

// Para testarmos nossa API de JSON irei utilizar o POSTMAN
// uma extensão do Chrome para requisições HTTP

// Na mesma rota / eu vou tanto poder buscar as cervejas
// Como vou poder criar as cervejas

// Vamos começar a integrar com nosso CRUD de cervejas
// Para isso precisamos instalar o mongoose 
// Depois copiamos nossos arquivos passados
// das pastas controllers e models

module.exports = router;
