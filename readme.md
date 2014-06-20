#Be MEAN - Criando sistemas inteiros apenas com Javascript
Vamos aprender com esse material a criar um sistema inteiro utilizando apenas nosso querido e amado Javascript. Desde o Frontend até o Banco de Dados. 

![](https://i.cloudup.com/WI6pC8JKia.png) 

##MEAN
![](https://i.cloudup.com/Taslszh86K.jpg)

###O que siginifica MEAN?
Nada mais que a sigla das tecnologias utilizadas:
- MongoDb
- Express
- AngularJs
- Node.js

##Por que usar MEAN?
Hoje essa stack MEAN nos oferece as mesmas funcionalidades que stacks largamente utilizadas como LAMP/MAMP/WAMP adicionando maior performance opr utilizar tecnologias feitas para escalar como Node.js e MongoDb.

Sem contar que o Javascript é a linguagem mais utilizada na Web não precisando muito esforço para entender o porquê já que é a única linguagem que roda nativamente em qualquer navegador e que foi criada especificamente para a Internet, por mais que ainda precise melhorar muito, mas já está no caminho com o EcmaScript 6.

##Arquitetura
Nesse Workshop iremos criar um Single Page App onde nosso Frontend feito com AngularJs consumirá os dados do Backend feito com o Node.js e MongoDb.
![](https://i.cloudup.com/bg9bVWvHGG.png)

##MongoDb
###NoSQL
O termo NoSQL foi usado pela primeira vez em 1998 como o nome de um banco de dados relacional de código aberto que não possuía um interface SQL. Seu autor, Carlo Strozzi, alega que o movimento NoSQL "é completamente distinto do modelo relacional e portanto deveria ser mais apropriadamente chamado "NoREL" ou algo que produzisse o mesmo efeito". Porém o termo só voltou a ser assunto em 2009 por um funcionário do Rackspace, Eric Evans, quando Johan Oskarsson da Last.fm queria organizar um evento para discutir bancos de dados open source distribuídos. 

NoSQL são diferentes sistemas de armazenamento que vieram para suprir necessidades onde os bancos de dados tradicionais(Relacionais) são ineficazes. Muitas dessas bases apresentam características muito interessantes como alta performance, escalabilidade, replicação, suporte à dados estruturados, grafos e sub-colunas. 

O NoSQL surgiu da necessidade de uma performance superior e de alta escalabilidade. Os atuais bancos de dados relacionais são muito restritos a isso, sendo necessário a distribuição vertical de servidores, ou seja, quanto mais dados, mais memória e mais disco um servidor precisa. O NoSQL tem uma grande facilidade na distribuição horizontal, ou seja, mais dados, mais servidores, não necessariamente de alta performance. Um grande utilizador desse conceito é o google, que usa computadores de pequeno e médio porte, para a distribuição dos dados, essa forma de utilização e muito mais eficiente e econômica. Alem disso, os bancos de dados NoSQL são muito tolerantes a erros. 

No caso dos bancos NoSQL toda a a informação necessária estará agrupada no mesmo registro, ou seja, em vez de você ter o relacionamento entre várias tabelas para formar uma informação ela estará em sua totalidade no mesmo registro. 

####Por que usar?
Os bancos de dados NoSQL nasceram de necessidades mais específicas, então quase sempre encontramos algum para resolver melhor algum problema. Caso necessitemos de um sistema que tenha como obrigação alta escalabilidade a baixo custo provavelmente usaremos algum banco de dados NoSQL.   
Quando nosso banco de dados relacional não aguenta mais requisições crescentes e o servidor ja está no seu máximo essa seria uma boa hora para testar algum NoSQL. Assim como podemos usar mais de um banco NoSQL para tratar de objetivos específicos. 
Além disso vários bancos NoSQL são schema-less, ou seja, não necessitam que uma estrutura seja pré-definida para a inserção de dados. Isso proporciona maior dinamismo na manipulação dos dados.

####Onde usar?
Hoje em dia temos vários bancos NoSQL que podem resolver diversos problemas porém eles não são a chave para TODOS os problemas. Ainda existem cenários onde os bancos relacionais são mais indicados, visto que os mesmos possuem propriedades ACID, logo são melhores em cenários onde os dados são muitíssimo importantes e não pode haver nenhuma quebra de referencia. Ou seja não indicaria, ainda, algum banco NoSQL para sistemas de transações financeiras, por exemplo.
Agora se o seu sistema é alguma rede social, ou algum site que necessite de alta disponibilidade ou escalabilidade com certeza lhe indicaria algum banco NoSQL.
Entretanto não precisamos mudar todo o sistema para algum banco NoSQL, podemos muito bem utilizar um banco NoSQL e um relacional em conjunto. Como muitos ja fazem hoje em dia mas nem percebem. Por exemplo um sistema que utiliza cache, com certeza esta usando um banco NoSQL no cache como o mais conhecido Memcached. A Api Storage do HTML5 também utiliza um sistema de banco NoSQL do tipo chave-valor.

####Tipo de armazenamento
Existem diversos tipos de armazenamento, onde cada um trata os dados de uma forma diferente e que pode ser mais específico para o objetivo desejado.
Os tipo de armazenamento são: Wide Column Store/Column Families, Document Store, Key Value/Tuple Store, Eventually Consistent Key Value Store, Graph Databases, Object Databases, Grid Database Solutions, XML Databases. Lista retirada de http://nosql-database.org/ 

#####Key/Value Store
Esse é o tipo de banco de dados NoSQL mais simples o conceito dele é uma chave e um valor para essa chave, mas ele é o que aguenta mais carga de dados. Esses tipos de bancos de dados, são o que tem a maior escalabilidade. 
- Berkeley DB 
- Tokyo Cabinet 
- Kyoto Cabinet
- Project Voldermort 
- MemcacheDB 
- SimpleBD 
- Redis
- Riak

#####Wide Columns Store
Fortemente inspirados pelo BigTable do Google eles suportam várias linhas e colunas, alem disso ele permite subcolunas. Alem do BigTable do google outros que usam essa tecnologia são: 
- HBase(Apache) 
- HiperTable 
- Cassandra(Apache) 

#####Document Store
Baseado em documentos XML ou JSON, podem ser localizados pelo seu id unico ou por qualquer registro que tenha no documento. 
- CouchDB(Apache) 
- MongoDB 
- RavenDB 

#####Graph Store
Com uma complexibilidade maior esses bancos de dados guardam objetos e não registros como os outros tipos de NoSQL. A busca destes itens são feitas pela navegação destes objetos. 
- Neo4J 
- InfoGrid 
- HyperGraphDB 

Na imagem abaixo podemos ver um gráfico demonstrando a diferença entre o tamanho da base de dados pela complexidade dos seus dados. Assim podemos perceber que os bancos do tipo chave-valor conseguem aguentar mais dados, sendo que seus dados são mais simples, enquanto que os banco do tipo grafo aguentam menos dados porém seus dados são mais complexos.

![](http://blog.3pillarglobal.com/sites/default/files/nosql-3a.png)

###Introdução
O MongoDB é um dos bancos NoSQL mais utilizados atualmente pela sua facilidade de instalação, documentação e os diversos drivers para inúmeras linguagens de programação. Ele é um banco de dados orientado a documentos, escalável, livre de esquema, de alto desempenho e código aberto escrito em C++.
Algumas funcionalidades interessantes do MongoDB são: orientação a documentos(JSON/BSON), suporte a index, replicação e alta disponibilidade, auto-sharding, map/reduce GridFS e suporte comercial da 10gen.

####Schemaless
![](http://www.greenberg-art.com/.Illustrations/.Humorous/qq1sgMessyDesk.jpg)
O que significa ser livre de esquema? Basicamente é não precisar ter nenhum objeto identificando como será nosso modelo de persistência, ou seja, não terá nada dizendo o nome dos campos nem seus tipos.

E isso é bom? Dependendo do que você quer fazer sim, ele dá maior liberdade para futuras modificações e maiores possibilidades de modelagem em comparação à relacional.

####JSON/BSON
![](http://wp.clicrbs.com.br/infosfera/files/2014/04/jason-2.jpg)
O MongoDb é um banco NoSQL orientado a documento [JSON](http://json.org/), ou seja, ele persiste os dados usando o formato [JSON](http://json.org/) criando assim um formato único de troca de dados em todo stack [MEAN](http://bemean.com.br/).

####Replica
![](http://images.freshnessmag.com/wp-content/uploads/2010/07/bat-pod-replica-1.jpg)
Possuímos réplicas na maioria dos bancos de dados relacionais também, ela apenas faz o espelhamento dos seus dados de um servidor para outro.

####Sharding
![](http://www.codefutures.com/img/dbshards-shardit.gif)

####GridFs
![](http://www.kratedesign.com/wp-content/uploads/2012/11/less-files-more-miles.jpg)

##Express
![](https://i.cloudup.com/OgEsvIwmiL.png)

Iremos trabalhar com uma API REST no Express e para isso iremos utilizar 4 verbos diferentes para trabalhar com nossas rotas e para isso faremos um CRUD:

- Create: POST
- Retrieve: GET
- Update: PUT
- Delete: DELETE

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

Com o show funcionando podemos refatorar nossa view `beer/index.jade` para:

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
!()[https://i.cloudup.com/_O1Y7F0CfP.png]

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
!()[https://i.cloudup.com/ydNx3qYuyu.png]

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
!()[https://i.cloudup.com/830l3-ls6B.png]
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
![](https://i.cloudup.com/M_kYIOWyyn.png)

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


###RETRIEVE
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
        tr(data-ng-repeat='cerveja in cervejas | orderBy:predicate:reverse')
          td {{ cerveja.name }}
          td {{ cerveja.category }}

Como você deve ter percebido estamos chamando a função orderBy, onde ela 
irá ordernar nossa tabela a partir dos campos name e categoruy. Então 
vamos ver como vai ficar nossa função `orderBy` no controller `BeersIndexCtrl`:

    $scope.orderBy = function(predicate){
      $scope.predicate = predicate;
      $scope.reverse = !$scope.reverse;
    }

Setando o `$scope.reverse = !scope.reverse` estamos invertendo a nossa listagem, então quando você clickar novamente no mesmo campo ele apenas inverterá a seleção.

####Integração com o exercício do Express
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

####Consultar
Nesse ponto já integramos nossa listagem em MEAN, precisamos agora fazer a consulta individual de cada cerveja, então vamos refatorar nossa view `list`:

    tr(data-ng-repeat='cerveja in cervejas | orderBy:predicate:reverse')
      td 
        a(data-ng-href='/beers/{{cerveja._id}}')
          {{ cerveja.name }}
      td 
        a(data-ng-href='/beers/{{cerveja._id}}')
          {{ cerveja.category }}

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

Nesse controller usamos o $routeParams do AngularJs para pegar as variáveis da rota, igual o `request.params` do Express.

E pronto quando clickarmos em qualquer link da nossa listagem das cervejas vamos entrar na rota que irá mostrar os dados da cerveja.

###CREATE
Antes de criarmos nossas funcionalidades de `UPDATE` e `DELETE` vamos criar a funcionalidade de criação da cerveja, primeiramente criando sua rota no AngularJs:

    when('/beers/create', {
      templateUrl: 'expose/beers/create',
      controller: 'BeersCreateCtrl'
    }).

Agora vamos criar nossa view `create.jade`:
    
    h3 {{ workshop }}
    h4 {{ msg }}
    form.container-small
      label
        | Name:
        input(type='text', name='cerveja.name', 
              data-ng-model='cerveja.name')
      label
        | Category:
        input(type='text', name='cerveja.category', 
              data-ng-model='cerveja.category')
      label
        | Price:
        input(type='text', name='cerveja.price', 
              data-ng-model='cerveja.price')
      label
        | Alcohol:
        input(type='text', name='cerveja.alcohol', 
              data-ng-model='cerveja.alcohol')
      label
        | Description:
        textarea(name='description', 
                data-ng-model='cerveja.description')
      button(data-ng-click='create(cerveja)')
        | Criar


Logo precisamos ir no nosso controller `BeersCreateCtrl` e adicionar a função `create`:

    controller('BeersCreateCtrl', ['$scope', '$http', function ($scope, $http) {
      $scope.workshop = 'Workshop Be MEAN';
      $scope.msg = 'Cadastro de cerveja'
      var url = '/api/beers/';
      $scope.create = function(cerveja){
        var method = 'POST';
        console.table(cerveja);
        $http({
          method: method,
          url: url,
          data: cerveja
        }).
        success(function(data){
          $scope.msg = 'Cerveja ' + cerveja.name + ' criada com SUCESSO';
        }).
        error(function(err){
          console.log('Error: ', err);
          $scope.msg = 'Error:  ' + err;
        });
      }
    }])

Criei um $scope.msg para dar um feedback da ação para o usuário de forma simples. E pronto após isso podemos ir na nossa rota `beers/create` e criarmos nossa cerveja.

####$http
No `$http` agora estamos passando um objeto com as configurações da requisição:
    
    {
      method: method,
      url: url,
      data: cerveja
    }

Onde:
- method: é o verbo do HTTP que vamos usar
- url: é a url que nossa requisição utilizará
- data: é o objeto a ser enviado pela requisição

###UPDATE
Depois de listarmos e criarmos nossas cervejas precisamos poder alterá-las também, então dentro da nossa view `show` vamos adicionar um link para o `UPDATE` e para o `DELETE`:

    p
      a(data-ng-href='beers/{{cerveja._id}}/edit')
        | Alterar
    p 
      a(data-ng-href='beers/{{cerveja._id}}/remove')
        | Excluir

Após adicionarmos esses links precisamos criar suas respectivas rotas:

    when('/beers/:id/edit', {
      templateUrl: 'expose/beers/edit',
      controller: 'BeersEditCtrl'
    }).
    when('/beers/:id/remove', {
      templateUrl: 'expose/beers/remove',
      controller: 'BeersRemoveCtrl'
    })

E agora vamos criar seus controllers:

    controller('BeersEditCtrl', ['$scope', '$http', '$routeParams', 
      function ($scope, $http, $routeParams) {
      $scope.workshop = 'Workshop Be MEAN';

      // Precisamos buscar nosssa cerveja na nossa API
      var id = $routeParams.id;
      var url = '/api/beers/'+id;

    }]).
    controller('BeersRemoveCtrl', ['$scope', '$http', '$routeParams', 
      function ($scope, $http, $routeParams) {
      $scope.workshop = 'Workshop Be MEAN';

      // Precisamos buscar nosssa cerveja na nossa API
      var id = $routeParams.id;
      var url = '/api/beers/'+id;

    }])

Vamos iniciar pela criação da view `edit.jade`:

    h3 {{ workshop }}
    h4 {{ msg }}
    form.container-small
      label
        | Name:
        input(type='text', name='cerveja.name', 
              data-ng-model='cerveja.name')
      label
        | Category:
        input(type='text', name='cerveja.category', 
              data-ng-model='cerveja.category')
      label
        | Price:
        input(type='text', name='cerveja.price', 
              data-ng-model='cerveja.price')
      label
        | Alcohol:
        input(type='text', name='cerveja.alcohol', 
              data-ng-model='cerveja.alcohol')
      label
        | Description:
        textarea(name='description', 
                data-ng-model='cerveja.description')
      button(data-ng-click='update(cerveja)')
        | Salvar

Agora vamos no nosso controller `BeersEditCtrl` e criar a função que vai consultar a cerveja a ser alterada, ou seja, re-usar a função onde mostramos os dados da cerveja. Para isso inicialmente adicionamos o `$routeParams`:

    controller('BeersCreateCtrl', ['$scope', '$http', '$routeParams', 
      function ($scope, $http, $routeParams)

E chamamos a cerveja a ser alterada para mostrar os valores na view:

    // Precisamos buscar nosssa cerveja na nossa API
    var id = $routeParams.id;
    var url = '/api/beers/'+id;
    var method = 'GET';
    $http({
      method: method,
      url: url
    })
    .success(function(data){
      $scope.msg = 'Cerveja ' + data.name;
      $scope.cerveja = data;
    })
    .error(function(err){
      console.log('Error: ', err);
      $scope.msg = 'Error:  ' + err;
    });

Após buscarmos nossa cerveja a ser alterada, precisamos criar a função de  `UPDATE`:

    // Função de alterar
    $scope.update = function(cerveja){    
      method = 'PUT';
      $http({
        method: method,
        url: url,
        data: cerveja
      })
      .success(function(data){
        $scope.msg = 'Cerveja ' + cerveja.name + ' alterada com SUCESSO';
      })
      .error(function(err){
        console.log('Error: ', err);
        $scope.msg = 'Error:  ' + err;
      });
    }


Depois da view vamos criar a função `update` no controller `BeersEditCtrl`:

Porém vamos fazer uma modificação no controller da nossa API `controllers/api/beer.js`:


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
    }

Mudamos o `res.send` para `res.json` para que nossa requisição do AngularJs não caia no `error`.


###DELETE
Como já havíamos criado a rota do `DELETE` vamos agora criar nossa view, que basicamente é a mesma do show apenas com o botão para deletar.

    h3 {{ workshop }}
    h4 {{ msg }}

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

    p 
      button(data-ng-click='remove(cerveja)')
        | Excluir

Depois alteramos o controller `BeersRemoveCtrl`:

    controller('BeersRemoveCtrl', ['$scope', '$http', '$routeParams', 
      function ($scope, $http, $routeParams) {
      $scope.workshop = 'Workshop Be MEAN';

      // Precisamos buscar nosssa cerveja na nossa API
      var id = $routeParams.id;
      var url = '/api/beers/'+id;
      var method = 'GET';
      $http({
        method: method,
        url: url
      })
      .success(function(data){
        $scope.msg = 'Cerveja ' + data.name;
        $scope.cerveja = data;
      })
      .error(function(err){
        console.log('Error: ', err);
        $scope.msg = 'Error:  ' + err;
      });

      // Função de deletar
      $scope.remove = function(cerveja){    
        var method = 'DELETE';
        var query = {
          _id: cerveja._id
        };

        var http_settings = {
          method: method,
          url: url,
          data: query
        };
        console.log('alterando', http_settings);
        $http(http_settings)
        .success(function(data){
          $scope.msg = 'Cerveja ' + cerveja.name + ' deletada com SUCESSO';
        })
        .error(function(err){
          console.log('Error: ', err);
          $scope.msg = 'Error:  ' + err;
        });
      }
    }])

Lembrando que precisamos editar o `controllers/api/beer.js` na função `delete` para usa o `res.json` em vez do `res.send`:

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




##Projeto Final 30/JUNHO/2014
Criar um sistema que seja composto de lojas de cervejas, onde os usuários poderão se cadastrar e falar que tomaram as cervejas. Nisso teremos basiacamente 3 coleções:

- users
- shops
- beers

Onde beers terá um array que conterá o ObjectId de cada cerveja que eles vendam e os usuarios possuirão um array com cada cerveja que já tomaram.

O sistema deverá ser um Single Page App onde o usuário se cadastrará e pesquisará pelas cervejas, **dica: use regex na query**, a cerveja que ele quiser poderá adicionar em sua coleção. E nessa cerveja além dos seus dados também mostrará quais lojas vendem.

####Model beer
- name
- price
- alcohol
- category
- description

####Model shop
- name
- address //object {logradouro, nome, numero, complemento, bairro, cidade, estado, país}
- beers

####Model user
- login
- email
- password //criptografado
- birth //data de nascimento
- beers

Na parte de user pode ser usado o Passport ou diretamente o mean.io que já possui um boilerplate usável com o Passport já integrado.

Além dos CRUDs a interface também contará pontos e todos os projetos deverão ser enviados via [github](http://github.com).

Podendo usar boilerplates de css como: Boostrap, Foundation e outros.


####Tópicos a serem explicados via Hangouts:

- Node.js: crypt
- Mongoose: populate
- MEAN.io: arquitetura, passport








