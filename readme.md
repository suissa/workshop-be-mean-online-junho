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
























