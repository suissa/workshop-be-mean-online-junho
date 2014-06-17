
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('errorhandler'),
  morgan = require('morgan'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  app.use(errorHandler());
}

// production only
if (env === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/name', api.name);

// API REST
// criando a rota /api/beers usando o módulo api.beers
// app.use('/api/beers', api.beers);


// criando o objeto de rotas da API
var api = {};
// instanciando o módulo de beers
// api.beers = require('./routes/api/beers');

// requisitando nosso controller
var beer = require('./controllers/api/beer');

console.log(beer);

// crio a rota com GET para /beers
// router.get('/', function(req, res){
//   // chamo a funcão de retrieve do meu controller
//   // passando req e res como parametro
//   beer.retrieve(req, res);
// });
app.get('/api/beers', beer.retrieve);

// Criar a rota para consultar uma cerveja
// utilizando GET para /beers/:id
// app.get('/:id', function(req, res){
//   // chamo a funcão de retrieve do meu controller
//   // passando req e res como parametro
//   beer.findOne(req, res);
//   // Então preciso criar essa função no meu controller
// });
app.get('/api/beers:id', beer.findOne);

// crio a rota com POST para /beers
// app.post('/', function(req, res){
//   // chamo a funcão de retrieve do meu controller
//   // passando req e res como parametro
//   beer.create(req, res);
// });
app.post('/api/beers', beer.create);
// app.post('/:id', beer.update);

// crio a rota com PUT para /beers/:id
// o :id é uma variável da nossa rota
// app.put('/:id', function(req, res){
//   // pegarei esse :id em request.params.id
//   // mas usarei ele na minha função de update
//   beer.update(req, res);
// });
app.put('/api/beers', function(req, res){
  console.log('ENTREI AQUI PARA ALTERAR BAH!');
});
app.put('/api/beers:id', beer.update);

// crio a rota com DELETE para /beers/:id
// app.delete('/:id', function(req, res){
//   // pegarei esse :id em request.params.id
//   // mas usarei ele na minha função de delete
//   beer.delete(req, res);
// });
app.delete('/api/beers:id', beer.delete);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
