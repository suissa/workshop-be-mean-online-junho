var express = require('express');
var router = express.Router();

/* GET home page. */
// criando a rota para a / usando GET
router.get('/', function(req, res) {
  // estou renderizando a view index
  // enviando para view om objeto {title: 'Express'}
  res.render('index', { title: 'Express' });

  // Então quando eu bater na minha /
  // o servidor ira renderizar a minha view index
});

module.exports = router;
