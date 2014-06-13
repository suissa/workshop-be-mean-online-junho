// requisitando o model de Beer
var Beer = require('../models/beer');

// criando o objeto com as funcionalidades visuais do sistema
var _beer = {
  // função que renderizará o form de criação da cerveja
  add: function(req, res){
  },
  // função que renderizará a index
  index: function(req, res){
    // Vamos criar a renderização do nosso INDEX
    res.render('beer/index', {title: 'Adega Be MEAN'});
  },
  // função que renderizará a consulta da cerveja
  show: function(req, res){
  },
  // função que renderizará o form de alteração da cerveja
  update: function(req, res){
  },
  // função que renderizará o form de deleção da cerveja
  delete: function(req, res){
  }
}

module.exports = _beer;

