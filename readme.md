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

Nosso template engine só executa as expressões que estão entre {{ }}.

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

###Two-way data binding
O two-way data binding é uma forma onde a view é gerada pelo template, porém
sem o merge com o Model, deixando com que os dados possam ser atualizados
a partir do Model e vice-versa. Logo qualquer modificação no Model irá 
atualizar a View e qualquer modificação na View irá atualizar o Model.

Exemplo:
    

    <label>Seu nome: 
      <input type="text" data-ng-model="nome"> 
    </label>
    <p>
      Olá mundo, {{ nome }}
    </p>


Com isso quando escrevemos qualquer coisa no input ele automaticamente 
atualiza o texto "Olá mundo, " com esse valor. 

Apenas para dar um exemplo de como isso ficaria com jQuery:

    $(document).ready(function(){
      $('input[type=text]').on('input', function(){
        var val = $(this).val();
        $('p').text(val);
      });
    });


Agora salve como ex04 e modifique o TITLE:

    <title>{{ workshop }}</title>

Depois adicione no BODY um ng-model:

    <label>Workshop: 
      <input type="text" data-ng-model="workshop"> 
    </label>

Com isso nós iremos pdoer modificar nosso TITLE dinamicamente. Porém antes 
preciso colocar meu ng-app acima do TITLE, ficando:

    <html data-ng-app="workshopBeMEAN">

###Filters

Os filtros serverm para transformar e formatar dados já exibidos para 
o usuário. Para isso precisamos apenas criar seu módulo, sua função e 
injetar como dependência na nossa aplicação.

Para chamar um filtro precisamos passa apenas ` | nomeFiltro`

    <h3>Olá mundo, {{ nome | reverseName }}</h3>

Criando o módulo para o filtro e injetando na nossa aplicação:

    <script>
      angular.module('workshopBeMEAN', ['workshopFilters']);
      angular.module('workshopFilters', [])
      .filter('reverseName', function () {
        return function (text) {
          if(text)
            return text.split("").reverse().join("");
        };
      });
    </script>

Também podemos utilizar mais de um filtro, apenas adicionando 
` | nomeFiltro`


    <h3>Olá mundo, {{ nome | reverseName | uppercase }}</h3>

Possuímos diversos filtros nativos no AngularJs como:

- uppercase: {{ nome | uppercase }}
- lowercase: {{ nome | lowercase }}
- number: {{ 1234 | number:2 }}
- date: {{ 1402772567464 | date:'dd/MM/yyyy HH:mm:ss Z'}}
- currency: {{ amount | currency:"R$" }}


###Controllers

Para criarmos um controller precisamos apenas adicionar ele em um módulo, 
como no exemplo a seguir:

    angular.module('workshopBeMEAN', ['filters'])
      .controller('BeerController', ['$scope', function($scope){
        $scope.reverse = false;
        var cervejas = [{
          name: 'Kaiser', price: 2
          }, {
            name: 'Skol', price: 3
          }, {
            name: 'Glacial', price: 4
          }, {
            name: 'Polar', price: 6
          }, {
            name: 'Heineken', price: 10
          }
        ];
        $scope.cervejas = cervejas;
      }]);

Em cada controllers nós precisaremos injetar suas dependências, principalmente 
o $scope que é o nosso Model.

    ['$scope', function($scope)

Eu poderia muito bem passar como dependência apenas via paramêtro:

    function($scope)

Porém quando eu for minificar meu arquivo isso poderá gerar problemas, pois 
todos os outros controllers também possuem seus scopes. Logo a melhor forma 
e a mais indicada para injetar as dependências é listá-las antes como string.

Para que eu consiga acessar dados da minha View, preciso adicionar os valores 
no $scope:

    var cervejas = [{
      name: 'Kaiser', price: 2
      }, {
        name: 'Skol', price: 3
      }, {
        name: 'Glacial', price: 4
      }, {
        name: 'Polar', price: 6
      }, {
        name: 'Heineken', price: 10
      }
    ];
    $scope.cervejas = cervejas;

Com isso eu tenho acesso na minha View com {{ cervejas }}

Então com nosso array acessível na View podemos iterar sobre ele utilizando 
a diretiva ng-repeat:
    
    <ul>
      <li data-ng-repeat='beer in cervejas | orderBy:predicate:reverse'>
        {{ beer.name }} - {{ beer.price }}
      </li>
    </ul>

Nesse código o `ng-repeat` irá criar uma linha com `<li>` para cada cerveja 
que exista no nosso array. Muito parecido com o nosso for feito no Jade, porém estamos utilizando um dos filtros mais poderosos que é o orderBy:

    | orderBy:predicate:reverse'

Então esse filtro me diz que preciso ordenar pelo predicate seguindo reverse.

    <a href="" data-ng-click="predicate = 'name'; reverse=!reverse">Nome</a>

Como podemos ver nesse link, possuímos a diretiva `ng-click` a qual irá 
setar predicate='name' e reverse=!reverse, ou seja, inverte o valor de reverse.
Quando eu clickar nesse link ele irá setar esses valores fazendo com que o 
AngularJs ordene automaticamente nosso array.

Para tirarmos proveito da modularização do AngularJs iremos criar um módulo 
para nosso controller, como no ex09:

    angular.module('workshopBeMEAN', ['workshopFilters', 'workshopControllers']);
      angular.module('workshopControllers', [])
      .controller('BeerController', ['$scope', 
        function($scope){
          var cerveja1 = {name: 'kaiser', price: 2};
          var cerveja2 = {name: 'skol', price: 3};
          var cerveja3 = {name: 'glacial', price: 4};
          var cerveja4 = {name: 'polar', price: 6};
          // ADICIONANDO AS CERVEJAS NO SCOPE DO CONTROLLER
          $scope.cervejas = [cerveja1, cerveja2, cerveja3, cerveja4];
      }]);


Agora vamos ver com utilizamos 2 Controllers na mesma view, para que isso 
seja possível precisamos utilizar a diretiva `ng-controller`.

    <div data-ng-controller='BeerController'>
    <div data-ng-controller='EnderecoController'>

Deixando nosso módulo de Controllers da seguinte forma:

    angular.module('workshopControllers', [])
      .controller('EnderecoController', ['$scope', '$http', 
        function($scope, $http){

          // exemplo de função que irá rodar com um CLICK
          $scope.rodar = function(){
            alert('RODOU');
          }

          var url = 'http://cors.io/cep.correiocontrol.com.br/02011200.json';

          $http.get(url)
          .success(function(data) { //função executada após o sucesso da requisição
            console.log(data);
            $scope.end = data;
            // Object {bairro: "Santana", logradouro: "Rua Voluntários da Pátria", cep: "02011200", uf: "SP", localidade: "São Paulo"} 
          })
          .error(function(err){ //função executada após o erro da requisição
            console.log('Error: ', err)
          });
        }])
      .controller('BeerController', ['$scope', '$http',
        function($scope, $http){
          var cerveja1 = {name: 'kaiser', price: 2};
          var cerveja2 = {name: 'skol', price: 3};
          var cerveja3 = {name: 'glacial', price: 4};
          var cerveja4 = {name: 'polar', price: 6};
          // ADICIONANDO AS CERVEJAS NO SCOPE DO CONTROLLER
          $scope.cervejas = [cerveja1, cerveja2, cerveja3, cerveja4];
      }]);

Então para usarmos nosso $http, antes precisamos injetá-lo como dependência:

    ['$scope', '$http', function($scope, $http)

Depois já podemos utilizá-lo da seguinte forma:


    var url = 'http://cors.io/cep.correiocontrol.com.br/02011200.json';

    $http.get(url)
    .success(function(data) { //função executada após o sucesso da requisição
      console.log(data);
      $scope.end = data;
      // Object {bairro: "Santana", logradouro: "Rua Voluntários da Pátria", cep: "02011200", uf: "SP", localidade: "São Paulo"} 
    })
    .error(function(err){ //função executada após o erro da requisição
      console.log('Error: ', err)
    });

**dica**

Estou usando o serviço do `cors.io` para fazer requisições externas, já que 
os navegadores implementam a política de mesma origem 
([Same-origin Policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)), ou seja, você só pode 
fazer requisições via navegador para o mesmo servidor, não podendo mudar 
nenhuma dessas 3 variáveis:

- protocolo
- host
- porta

    protocolo://host:porta
    http://localhost:8080 é diferente de:
    https://localhost:8080 
    http://sub.localhost:8080 
    http://localhost:3000

Então para "burlar" essa política nosso servidor precisa habilitar o 
[CORS](http://pt.wikipedia.org/wiki/Cross-origin_resource_sharing), 
caso não tenhamos acesso ao servidor, podemos utilizar esse serviço web 
rodando em `http://cors.io`.

No retorno da nossa consulta com $http recebemos 2 promisses:

- success
- error

Então é nessas promisses que minha lógica de manipulação do retorno irá 
trabalhar.

    .success(function(data) { //função executada após o sucesso da requisição
      console.log(data);
      $scope.end = data;
      // Object {bairro: "Santana", logradouro: "Rua Voluntários da Pátria", cep: "02011200", uf: "SP", localidade: "São Paulo"} 
    })
    .error(function(err){ //função executada após o erro da requisição
      console.log('Error: ', err)
    });

Então fica claro de identificar o que cada uma faz e com isso deixamos 
nosso código mais limpo e legível.

Na promisse de success é onde instanciamos a variável end no nosso $scope

    $scope.end = data;

Para que ela seja acessível dentro do nosso Controller na View.

    <div data-ng-controller='EnderecoController'>
      <button data-ng-click='rodar()'>Click aqui</button>
      <p>
        Endereço: {{ end }}
      </p>
    </div>

Ou seja, eu só acesso as variáveis e funções do meu $scope dentro do meu 
ng-controller correto. Pois esses dados só existem nesse $scope local.

Além de usarmos o $http nesse Controller também criamos uma função que será 
acessada via `ng-click`:

    // exemplo de função que irá rodar com um CLICK
      $scope.rodar = function(){
        alert('RODOU');
      }

Ela será chamada na nossa view da seguinte forma:

    <button data-ng-click='rodar()'>Click aqui</button>

###Rotas

Vamos iniciar esse módulo clonando o seed do AngularJs.

    git clone git://github.com/angular/angular-seed.git

Depois de entrar na pasta angular-seed, você verá o arquivo `bower.json`.
Para instalarmos nossos assets de frontend, precisamos instalar o Bower antes.

    npm install -g bower

Agora localmente primeiro vamos rodar:

    npm install

Para iniciar nosso projeto precisamos apenas rodar:

    npm start

Depois conferir me `localhost:8000/app`.


###Routes
O nosso roteamento se dá apenas no navegador sem que precisemos requisitar 
nenhum dado no nosso servidor. Já que o AngularJs é um framework para 
Single Page Applications ele irá gerenciar todas essas rotas localmente, 
emulando a troca das URL utilizando a History API e PushState.

Para definirmos nossas rotas iremos utilizar o `$routeProvider`.

    config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
      $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
      $routeProvider.otherwise({redirectTo: '/view1'});
    }])

Onde em `when` eu irei setar minha rota, passando sua url e um objeto com 
meu Template, `templateUrl`, e meu Controller, `controller`.

####templateUrl
O templateUrl é a URL para a nossa View a ser renderizada.

####controller
O controller irá chamar a função setada nele.

####otherwise
É a função parecida com o default do switch, ou seja, caso a rota 
requisitada não exista ele irá redireciar para essa.

Após criarmos nossa rota em config, precisamos criar nossa view em
`partials/beers/index.html`

    <h3>
      {{ workshop }}
    </h3>

    INDEX DAS CERVEJAS

Depois vamos criar nosso controller `BeersIndexCtrl`:

    .controller('BeersIndexCtrl', ['$scope', function ($scope) {
      $scope.workshop = 'Workshop Be MEAN';
    }])

Passando apenas a variável workshop para ser mostrada na View.

No `app/index.html` a linha mais importante para renderizar as views é 
a seguinte:

    <div ng-view></div>

Pois o `ng-view` é o responsável por renderizar as views.


###Listar
Agora vamos criar a View list.html e modificar na nossa rota.

    $routeProvider.when('/beers', {
        templateUrl: 'partials/beers/list.html', 
        controller: 'BeersIndexCtrl'
      });

Copiando o código do nosso exercício 08 nossa View lista ficará:

    <h3>
      {{ workshop }}
    </h3>
      
    <!-- Usando o filtro de ordenação -->
    <a href="" data-ng-click="reverse=!reverse">
      Ordenar por {{ predicate }} - {{ !reverse }}
    </a>
        
    <!-- Vamos listar nosso array usando o ng-repeat -->
    <ul>
    <!-- Parecido com o nosso for no Jade -->
      <li data-ng-repeat='beer in cervejas | orderBy:predicate:reverse'>
      <!-- acessando os valores do array -->
        {{ beer.name }} - {{ beer.price }}
      </li>
    </ul>

Copiamos o código do controller também ficando assim:

    controller('BeersIndexCtrl', ['$scope', function ($scope) {
      $scope.workshop = 'Workshop Be MEAN';
      
      // Código colado do exercicio 08
      $scope.reverse = false;
      $scope.predicate = 'name';

      // criamos um array de cervejas
      var cervejas = [{
        name: 'Kaiser', price: 2
        }, {
          name: 'Skol', price: 3
        }, {
          name: 'Glacial', price: 4
        }, {
          name: 'Polar', price: 6
        }, {
          name: 'Heineken', price: 10
        }
      ];

      // instanciamos nosso array no nosso scope
      // para que tenhamos acesso à esse array na View
      $scope.cervejas = cervejas;
      
      }])

Com isso na nossa rota /beers já temos uma listagem das cervejas com 
ordenção por nome.

Para entendermos mais um pouco como as coisas funcionam no AngularJs 
vamos pegar nosso exercicio 10 e copiar seu código do $http.

E vamos substituir essas cervejas setadas na mão por uma consulta na nossa 
API do Node.js

    var url = '/api/beers';
    
    $http.get(url)
    .success(function(data){
      $scope.cervejas = data;
      console.log('Cervejas', $scope.cervejas);
    })
    .error(function(err){
      console.log('Error: ', err);
    });

E corrigimos nossa view `list.jade`:

    h3
      | {{ workshop }}
    h4 Listagem das cervejas
    table
      thead
        tr
          th 
            a.order(data-ng-click='orderBy(\'name\')') Name
          th
            a.order(data-ng-click='orderBy(\'category\')') Category
      tbody
        tr(data-ng-repeat='beer in cervejas | orderBy:predicate:reverse')
          td {{ beer.name }}
          td {{ beer.category }}

Como você deve ter percebido estamos chamando a função orderBy, onde ela 
irá ordernar nossa tabela a partir dos campos name e categoruy. Então 
vamos ver como vai ficar nossa função `orderBy` no controller `BeersIndexCtrl`:

    $scope.orderBy = function(predicate){
      $scope.predicate = predicate;
      $scope.reverse = !$scope.reverse;
    }

Setando o `$scope.reverse = !scope.reverse` estamos invertendo a nossa listagem, então quando você clickar novamente no mesmo campo ele apenas inverterá a seleção.

###Integração com o exercício do Express
Agora vamos integrar a nossa API que criamos no Express anteriormente,  basta seguir esses passos:

1 - Copiar a pasta controllers do Express para o Angular Express Seed
2 - Copiar a pasta models do Express para o Angular Express Seed
3 - Passar as rotas do Express para o Angular Express Seed

As rotas vamos precisar integrar manualmente, então nosso `app.js` do Angular Express Seed ficará assim:


    /**
     * Routes
     */

    // serve index and view partials
    app.get('/', routes.index);
    app.get('/partials/:name', routes.partials);

    // JSON API
    app.get('/api/name', api.name);

    // API REST
    // criando o objeto de rotas da API
    var api = {};
    // requisitando nosso controller
    api.beer = require('./controllers/api/beer');
    app.get('/api/beers', api.beer.retrieve);
    app.get('/api/beers/:id', api.beer.findOne);
    app.post('/api/beers', api.beer.create);
    app.put('/api/beers/:id', api.beer.update);
    app.delete('/api/beers/:id', api.beer.delete);

    // redirect all others to the index (HTML5 history)
    app.get('*', routes.index);

Você percebeu que estamos requisitando nossa view do AngularJs para o Node.js?
Olhe nas nossas rotas do AngularJs:

    when('/view1', {
      templateUrl: 'partials/partial1',
      controller: 'MyCtrl1'
    }).
    when('/view2', {
      templateUrl: 'partials/partial2',
      controller: 'MyCtrl2'
    }).
    // criando a rota de listagem das cervejas
    when('/beers', {
      templateUrl: 'partials/list',
      controller: 'BeersIndexCtrl'
    })

Todo `templateUrl` bate em `partials/:name` o que é descrito no `app.js` do Express: 

    app.get('/partials/:name', routes.partials);

Então vamos ver o que essa função `routes.partials` faz. Primeiramente vemos que ela vem do objeto `routes`:

    routes = require('./routes'),

Isso quer dizer que estamos importando o arquivo `routes/index.js`:

    exports.index = function(req, res){
      res.render('index');
    };

    exports.partials = function (req, res) {
      var name = req.params.name;
      res.render('partials/' + name);
    };

Com isso conseguimos entender o que nossa função `partials` faz, ela renderiza qualquer nome de view repassada na URL, exemplo:

    /routes/list

Vai renderizar:

    /views/partials/list.jade

Agora vamos criar nossa própria função de renderização de views genéricas:

    exports.expose = function(req, res) {
      // pego o diretório da view
      var dir = req.params.dir;
      // pego o nome da view
      var name = req.params.name;
      // crio o nome completo da view
      var view = dir + '/' + name;

      // renderizo a view
      res.render(view);
    }

Depois de criamos nossa função `expose` vamos criar a rota que será responsável por executar essa função em app.js do Express:

    app.get('/expose/:dir/:name', routes.expose);

Depois disso podemos salvar o `list.jade` na pasta `/views/beers/`.

E agora corrigimos nossa rota `/beers` no app do AngularJs:

    when('/beers', {
      templateUrl: 'expose/beers/list',
      controller: 'BeersIndexCtrl'
    }).

Pronto. Agora sempre vamos buscar nossas views utilizando a rota `expose/:dir:name` deixando assim nossa função de partials mais genérica.

###Consultar
Nesse ponto já integramos nossa listagem em MEAN, precisamos agora fazer a consulta individual de cada cerveja, então vamos refatorar nossa view `list`:

    tr(data-ng-repeat='beer in cervejas | orderBy:predicate:reverse')
      td 
        a(ng-href='/beers/{{beer._id}}')
          {{ beer.name }}
      td 
        a(ng-href='/beers/{{beer._id}}')
          {{ beer.category }}

Depois de colocarmos um link para cada cerveja no formato `/beers/:id` precisamos criar essa rota no AngularJs:

    .when('/beers/:id', {
      templateUrl: 'expose/beers/show',
      controller: 'BeersShowCtrl'
    }).

Vamos criar a nossa view `beers/show.jade`:
    
    h3
      | {{ workshop }}

    ul
      h4 {{ cerveja.name }}
      li
        | Name: {{ cerveja.name }}
      li
        | Category: {{ cerveja.category }}
      li
        | Alcohol: {{ cerveja.alcohol }}
      li
        | Price: {{ cerveja.price }}
      li
        | Description: {{ cerveja.description }}

Depois disso criar o controller `BeersShowCtrl`:


    controller('BeersShowCtrl', ['$scope', '$http', '$routeParams', 
      function ($scope, $http, $routeParams) {
      $scope.workshop = 'Workshop Be MEAN';

      // Precisamos buscar nosssa cerveja na nossa API
      var id = $routeParams.id;
      var url = '/api/beers/'+id;

      $http.get(url)
      .success(function(data){
        $scope.cerveja = data;
        console.log('Cerveja', $scope.cerveja);
      })
      .error(function(err){
        console.log('Error: ', err);
      });

    }])


E pronto quando clickarmos em qualquer link da nossa listagem das cervejas vamos entrar na rota que irá mostrar os dados da cerveja.




