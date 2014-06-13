// requisitando o model de Beer
var Beer = require('../models/beer');

// Criandoa  variável de retorno de mensagem
var msg = '';

// criando o objeto com as funcionalidades visuais do sistema
var _beer = {
  // função que renderizará o form de criação da cerveja
  add: function(req, res){
  },
  // função que renderizará a index
  index: function(req, res){
    // COmo nossa função é assíncrona precisamos colocar nossa
    // renderização dentro dela
    Beer.find({}, function (err, data) {
      if (err){
        console.log('Erro: ', err);
        msg = 'Erro ao listar as cervejas!';
        // Vamos criar a renderização do nosso INDEX
        // Preciso passar o array de cervejas
        res.render('beer/index', 
          {
            title: 'Adega Be MEAN', 
            msg: msg
          }
        );
      }else{
        console.log('Listagem: ', data);  
        msg = 'Listagem das cervejas'; 
        // Vamos criar a renderização do nosso INDEX
        // Preciso passar o array de cervejas
        
        res.render('beer/index', 
          {
            title: 'Adega Be MEAN', 
            cervejas: data,
            msg: msg
          }
        );
      }
   
    }); 
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

