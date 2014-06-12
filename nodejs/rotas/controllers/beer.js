// requisitando o model de Beer
var Beer = require('../models/beer');

// criando o objeto com as funcionalidades do Mongoose
var _beer = {
  create: function(request, response){
    var dados = {
      name: 'Heineken',
      description: 'Essa passa',
      alcohol: 4.8,
      category: 'lager'
    }

    var model = new Beer(dados);

    model.save(function (err, data) {
      if (err){
        console.log('Erro: ', err);
        msg = 'Erro ao salvar a cerveja!';
      }
      else{
        console.log('Cerveja Inserida: ', data);  
        msg = 'Cerveja salva com sucesso!' 
      }
      // enviando a msg para o cliente
      response.end(msg);
    });
  },
  retrieve: function(request, response){
    Beer.find({}, function (err, data) {
      if (err){
        console.log('Erro: ', err);
        msg = 'Erro ao listar as cervejas!';
      }else{
        console.log('Listagem: ', data);  
        msg = 'Listagem: ' + JSON.stringify(data) 
      }
      // enviando a msg para o cliente
      response.end(msg);
    });
  },
  update: function(request, response){
    var query = {name: 'Heineken'};

    var mod = {alcohol: 666};

    Beer.update(query, mod, function (err, data) {
      if (err){
        console.log('Erro: ', err);
        msg = 'Erro ao atualizar a cerveja!';
      }else{
        console.log('Cerveja atualizada com sucesso', data);
        msg = 'Cerveja atualizada com sucesso!';    
      } 
      // enviando a msg para o cliente
      response.end(msg);
    });},
  delete: function(request, response){
    var query = {name: 'Heineken'};
 
    Beer.remove(query, function(err, data) {
      if(err) {
        console.log(err);
        msg = 'Erro ao deletar a cerveja!';
      } else {
        console.log('Cerveja deletada com sucesso', data);
        msg = 'Cerveja deletada com sucesso!';
      }
      // enviando a msg para o cliente
      response.end(msg);
    });
  }
}

module.exports = _beer;

