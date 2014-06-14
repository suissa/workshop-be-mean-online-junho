var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// requerindo os módulos de rotas
var routes = require('./routes/index');
var users = require('./routes/users');
// instanciando o módulo visual do sistema
var beers = require('./routes/beers');

// criando o objeto de rotas da API
var api = {};
// instanciando o módulo de beers
api.beers = require('./routes/api/beers');


// criando o servidor do express
var app = express();

// setando qual será o sistema de templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// utilizando os módulos como middlewares
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// utilizando o middleware que emula PUT e DELETE vindo pelo HTML
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// usando os módulos de rotas
app.use('/', routes);
app.use('/users', users);
app.use('/beers', beers);

// API REST
// criando a rota /api/beers usando o módulo api.beers
app.use('/api/beers', api.beers);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
