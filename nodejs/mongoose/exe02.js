var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/workshop-online');

var db = mongoose.connection;

db.on('error', function(err){
    console.log('Erro de conexao.', err)
});
db.once('open', function () {
  console.log('Conexão aberta.')
});

var Cat = mongoose.model('Cat', { name: String }, 'gatinhos');

var kitty = new Cat({ name: 'Osvaldinho' });
kitty.save(function (err, data) {
  if (err){
	 console.log('Erro: ', err);
  }
  console.log('meow', data);
});
