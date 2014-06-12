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
 
var Beer = mongoose.model('Beer', BeerSchema);
 
var query = {name: 'Skol'};
 
Beer.remove(query, function(err, data) {
  if(err) {
    console.log(err);
  } else {
    console.log('Cerveja deletada com sucesso', data);
  }
});


