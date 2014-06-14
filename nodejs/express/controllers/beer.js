// requisitando o model de Beer
var Beer = require('../models/beer');

// Criandoa  variável de retorno de mensagem
var msg = '';

// criando o objeto com as funcionalidades visuais do sistema
var _beer = {
  // função que renderizará o form de criação da cerveja
  add: function(req, res){
    // renderizando nossa view de create
    msg = 'Cadastro de cerveja'
    res.render('beer/create', 
      {
        title: 'Adega Be MEAN',
        msg: msg
      }
    );
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
    // Primeiramente precisamos consultar ae cerveja
    var query = {_id: req.params.id};

    Beer.findOne(query, function (err, data) {
      if (err){
        console.log('Erro: ', err);
        msg = 'Erro ao listar as cervejas!';

        res.render('beer/show', 
          {
            title: 'Adega Be MEAN',
            msg: msg
          }
        );
      }else{
        console.log('Listagem: ', data);  
        msg = 'Cerveja: ' + data.name; 
        // Enviamos a cerveja para view
        res.render('beer/show', 
          {
            title: 'Adega Be MEAN', 
            cerveja: data,
            msg: msg
          }
        );
      }
    });

  },
  // função que renderizará o form de alteração da cerveja
  save: function(req, res){
    // criando o objeto de query
    // para fazer a busca da cerveja a ser alterada
    var query = {_id: req.params.id};

    Beer.findOne(query, function (err, data) {
      if (err){
        console.log('Erro: ', err);
        msg = 'Erro ao buscar a cerveja!';
        // Enviamos a msg para view
        res.render('beer/save', 
          {
            title: 'Adega Be MEAN', 
            cerveja: data,
            msg: msg
          }
        );
      }else{
        console.log('Cerveja atualizada com sucesso', data);
        msg = 'Cerveja: ' + data.name; 
        // Enviamos a cerveja para view
        res.render('beer/save', 
          {
            title: 'Adega Be MEAN', 
            cerveja: data,
            msg: msg
          }
        );
      } 
    });

  },
  // função que renderizará o form de deleção da cerveja
  remove: function(req, res){
    // criando o objeto de query
    // para fazer a busca da cerveja a ser alterada
    var query = {_id: req.params.id};

    Beer.findOne(query, function (err, data) {
      if (err){
        console.log('Erro: ', err);
        msg = 'Erro ao buscar a cerveja!';
        // Enviamos a msg para view
        res.render('beer/remove', 
          {
            title: 'Adega Be MEAN', 
            cerveja: data,
            msg: msg
          }
        );
      }else{
        console.log('Cerveja removida com sucesso', data);
        msg = 'Cerveja: ' + data.name; 
        // Enviamos a cerveja para view
        res.render('beer/remove', 
          {
            title: 'Adega Be MEAN', 
            cerveja: data,
            msg: msg
          }
        );
      } 
    });
  }
}

module.exports = _beer;

