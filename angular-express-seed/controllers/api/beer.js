// requisitando o model de Beer
var Beer = require('../../models/beer');

// criando o objeto com as funcionalidades do Mongoose
var _beer = {
  create: function(req, res){
    // Vou receber os dados do meu POST
    // via req.body
    var dados = req.body;

    var model = new Beer(dados);

    model.save(function (err, data) {
      if (err){
        console.log('Erro: ', err);
        // msg = 'Erro ao salvar a cerveja!';
        msg = 0;
      }
      else{
        console.log('Cerveja Inserida: ', data);  
        // msg = 'Cerveja salva com sucesso!';
        msg = data 
      }
      // enviando a msg para o cliente
      res.send(msg);
    });
  },
  retrieve: function(req, res){
    Beer.find({}, function (err, data) {
      if (err){
        console.log('Erro: ', err);
        // msg = 'Erro ao listar as cervejas!';
        msg = 0;
      }else{
        console.log('Listagem: ', data);  
        msg = data; 
      }
      // enviamos o a msg como JSON
      res.json(msg);
    });
  },
  findOne: function(req, res){
    // crio o o objeto de query
    var query = {_id: req.params.id};
    Beer.findOne(query, function (err, data) {
      if (err){
        console.log('Erro: ', err);
        // msg = 'Erro ao listar as cervejas!';
        msg = 0;
      }else{
        console.log('Listagem: ', data);  
        msg = data; 
      }
      // enviamos o a msg como JSON
      res.json(msg);
    });
  },
  update: function(req, res){
    // criando o objeto de query
    // para fazer a busca da cerveja a ser alterada
    var query = {_id: req.params.id};
    // crio o objeto de modificação da cerveja
    // recebendo os dados via req.body
    var mod = req.body;
    Beer.update(query, mod, function (err, data) {
      if (err){
        console.log('Erro: ', err);
        // msg = 'Erro ao atualizar a cerveja!';
        msg = 0;
      }else{
        console.log('Cerveja atualizada com sucesso', data);
        // msg = 'Cerveja atualizada com sucesso!';    
        // retorna quantidade de cervejas atualizadas
        msg = data;
      } 
      // enviando a msg para o cliente
      res.json(msg);
    });
  },
  delete: function(req, res){
    // Criando a query para remover a cerveja pelo _id
    var query = {_id: req.params.id};
 
    Beer.remove(query, function(err, data) {
      if(err) {
        console.log(err);
        // msg = 'Erro ao deletar a cerveja!';
        msg = 0;
      } else {
        console.log('Cerveja deletada com sucesso', data);
        // msg = 'Cerveja deletada com sucesso!';
        // retorna a quantidade de elementos deletados
        msg = data;
      }
      // enviando a msg para o cliente
      res.json(msg);
    });
  }
}

module.exports = _beer;

