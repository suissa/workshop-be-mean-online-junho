Para iniciarmos qualquer funcionalidade vamos pensar 
no seguinte workflow:

1 cria uma rota no módulo. Ex.: /routes/beers
    // Rota para consulta da cerveja   
    router.get('/show', beer.show);

2 Criar a view a ser renderizada
    p.show
        span
          | Name: #{cerveja.name}
        span
          | Price: #{cerveja.price}
        span
          | Alcohol: #{cerveja.alcohol}
        span
          | Description: #{cerveja.description}

3 cria uma função no controller. Ex.: /controllers/beer
        function(req, res){
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


Com o show funcionando podemos refatorar nossa listagem das cervejas para:
//beer/index.jade

      ul
        for cerveja in cervejas
          li
            a(href='/beers/show/#{cerveja._id}')
              | #{cerveja.name} - #{cerveja.category}

Para iniciarmos a função de update, precisamos criar a rota da renderização
da sua view, /routes/beers.js

// Rota para alteração da cerveja
router.get('/save/:id', beer.save);

Depois criamos nossa função no controller

    function(req, res){
        // criando o objeto de query
        // para fazer a busca da cerveja a ser alterada
        var query = {_id: req.params.id};

        // crio o objeto de modificação da cerveja
        // recebendo os dados via req.body
        var mod = req.body;

        Beer.update(query, mod, function (err, data) {
          if (err){
            console.log('Erro: ', err);
            msg = 'Erro ao atualizar a cerveja!';
            // Enviamos a msg para view
            res.render('beer/show', 
              {
                title: 'Adega Be MEAN', 
                cerveja: data,
                msg: msg
              }
            );
          }else{
            console.log('Cerveja atualizada com sucesso', data);
            msg = 'Cerveja atualizada com sucesso!';    
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

Depois disso precisamos criar nossa view. Como não possuímos o verbo PUT via
HTML, precisamos emular ele. No caso utilizaremos um input[type=hidden] 
para enviar o nome do verbo, podendo ser: PUT ou DELETE, via POST. E 
enviamos o name do input como `_method._ 
Ficando assim:

    form(action='/api/beers', method='POST')
        label
          | Name:
          input(type='text', name='name', value='#{cerveja.name}')
        label
          | Price:
          input(type='text', name='price', value='#{cerveja.price}')
        label
          | Alcohol:
          input(type='text', name='alcohol', value='#{cerveja.alcohol}')
        label
          | Description:
          textarea(name='description')
            | #{cerveja.description}
        input(type='hidden', name='_method', value='PUT')
        input(type='submit', value='SALVAR')

Sendo que um middleware no Express fará a conversão de POST para PUT.
O middleware utilizado é o methodOverride.

Não esquecer de instalar localmente:
        npm install --save method-override


Para usarmos o method override com o nosso input, precisamos chamá-lo:

    app.use(
        methodOverride(function(req, res){
          if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            var method = req.body._method;
            delete req.body._method;
            return method;
          }
        })
    );


Após criarmos o UPDATE, vamos criar o DELETE. Criando inicialmente a 
nossa rota em routes/beers.js:

    // Rota para remoção da cerveja
    router.get('/remove/:id', beer.remove);

Depois criamos a função no controller que essencialmente é igual ao show:

    function(req, res){
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

Agora criamos nossa view que também é parecida com o a save.jade:

      form(action='/api/beers/#{cerveja._id}', method='POST', enctype='application/x-www-form-urlencoded')
        label
          | Name:
          input(type='text', name='name', value='#{cerveja.name}')
        label
          | Category:
          input(type='text', name='category', value='#{cerveja.category}')
        label
          | Price:
          input(type='text', name='price', value='#{cerveja.price}')
        label
          | Alcohol:
          input(type='text', name='alcohol', value='#{cerveja.alcohol}')
        label
          | Description:
          textarea(name='description')
            | #{cerveja.description}
        input(type='hidden', name='_method', value='DELETE')
        input(type='submit', value='REMOVER')




#AngularJs

O AngularJS é um framework criado por Misko Hevery e mantido pelo Google.
Ele trabalha com uma estrutura de MVC e um ótimo sistema de two way
data-bindings, além de suas diretivas darem super-poderes ao HTML.

Como o AngularJs é um framework e não uma biblioteca como o jQuery, o modo
de se trabalhar com ele é um pouco diferente do que éramos acostumados.

Para iniciarmos uma aplicação com o AngularJs, precisamos adicionar
o atributo ng-app em alguma tag do nosso HTML, normalmente em body ou html.

**dica**
Vamos instalar um servidor web em Node.js para que possamos rodar nossos
arquivos com AngularJs:

    npm install -g http-server

E para rodarmos, basta ir na pasta onde estão nosso arquivos e rodar:

    http-server
    Starting up http-server, serving ./ on port: 8080
    Hit CTRL-C to stop the server

**dica**

Então nosso exercício 01 ficará:

    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Workshop Be MEAN</title>
    </head>
    <!-- Iniciando minha aplicação com ng-app -->
    <body ng-app>
      
      <!-- Parseando essa expressão -->
        {{ 2 + 2}}
        <script src="angular.min.js"></script>
    </body>
    </html>

Então basta entrarmos em http://localhost:8080/ex01.html

Agora vamos salvar como esse exercício como ex02 e vamos modificar para
que fique dessa forma:

    <!doctype html>
    <html>
      <body data-ng-app="workshopBeMEAN">

        Olá mundo, 2 + 2 = {{ 2 + 2}}

        <script src="angular.min.js"></script>
        <script>
          angular.module('workshopBeMEAN', []);
        </script>
      </body>
    </html>

Dessa forma estamos setando um nome para nosso app `data-ng-app="workshopBeMEAN"` e você deve ter percebido o data- antes, dessa forma
seu código ficará válido para HTML5, mas não faz diferença real.

Depois no nosso script nós realmente criamos nosso módulo da aplicação:

    <script>
      angular.module('workshopBeMEAN', []);
    </script>

Estamos passando um array vazio, [], pois ainda não temos dependências
a serem injetadas no nosso módulo. Pois a base do AngularJs é a injeção
de dependências.

Para exemplificar um uso muito simples da injeção de dependência, imagine
que você possui um CRUD e está usando dessa forma:

    function create(){
        var db = mongoose.connection();
        // já temos o models e os dados e vamos salvar
        return user.save();
    };
    function retrieve(){
        var db = mongoose.connection();
        return user.list();
    };
    function update(dados){
        var db = mongoose.connection();
        return user.update(dados);
    };
    function delete(){
        var db = mongoose.connection();
        return user.remove();
    };

E agora seu sistema vai mudar de MongoDb para CouchDb, o que fazer?
Se o seu código estiver sem injeção de dependência você precisará modificar
todo seu código, por exemplo:

    function create(){
        var db = couchDb.connection();
        // já temos o models e os dados e vamos salvar
        return user.save();
    };
    function retrieve(){
        var db = couchDb.connection();
        return user.list();
    };
    function update(dados){
        var db = couchDb.connection();
        return user.update(dados);
    };
    function delete(){
        var db = couchDb.connection();
        return user.remove();
    };

Agora caso você tivesse escrito o código já com injeção de dependência, 
ele ficaria assim:

    // var db = mongoose.connection();
    var db = couchDb.connection();
    function create(db){
        // já temos o models e os dados e vamos salvar
        return user.save();
    };
    function retrieve(db){
        return user.list();
    };
    function update(db, dados){
        return user.update(dados);
    };
    function delete(db){
        return user.remove();
    };

Com isso eu crio a dependência externamente, independente do código de cada
função, ficando assim mais simples de se trocar as peças injetadas.








