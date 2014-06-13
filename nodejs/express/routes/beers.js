var express = require('express');
var router = express.Router();
// requisitando nosso controller
var beer = require('../controllers/beer');

// Criamos nossas rotas que serão acessadas via navegador
// renderizando as views necessárias

// crio a rota com GET para /beers
// que será o index do nosso sistema
router.get('/', beer.index);
// Rota para criação da cerveja
router.get('/add', beer.add);

module.exports = router;
