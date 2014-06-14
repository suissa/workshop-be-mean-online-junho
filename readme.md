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









