var express = require('express');
var router = express.Router();
// requisitando nosso controller
var beer = require('../controllers/beer');

// Criamos nossas rotas que serão acessadas via navegador
// renderizando as views necessárias

// crio a rota com GET para /beers
// que será o index do nosso sistema
// router.get('/', beer.retrieve);

// router.get('/:id', beer.findOne);
// router.post('/', beer.create);

// router.put('/:id', beer.update);
// router.delete('/:id', beer.delete);

module.exports = router;
