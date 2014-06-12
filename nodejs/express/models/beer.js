var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/workshop-online');

var db = mongoose.connection;
db.on('error', function(err){
    console.log('Erro de conexao.', err)
});
db.once('open', function () {
  console.log('Conexão aberta.')
});

var Schema = mongoose.Schema;

var BeerSchema = new Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  alcohol: { type: Number, min: 0},
  category: { type: String, default: ''},
  created: { type: Date, default: Date.now }
});


// exporto meu objeto _beer para o módulo
// pois tudo que está dentro desse arquivo é privado
// apenas o que vc seta em exports que será público
module.exports = mongoose.model('Beer', BeerSchema);






