var express = require('express');
var router = express.Router();

/* GET users listing. */
// aqui eu crio a rota com GET para /users
router.get('/', function(req, res) {
  // envio uma string com resposta
  res.send('respond with a resource');

  // Então quando eu bater em /users 
  // receberei um texto com respond with a resource
});

module.exports = router;
