'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });

  }).
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  }).
  controller('BeersIndexCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.workshop = 'Workshop Be MEAN';

    // Código colado do exercicio 08
    $scope.reverse = false;
    $scope.predicate = 'name';
    $scope.cervejas = [];
    // criamos um array de cervejas
    // Precisamos buscar nosssas cervejas na nossa API
    var url = '/api/beers';

    $http.get(url)
    .success(function(data){
      $scope.cervejas = data;
      console.log('Cervejas', $scope.cervejas);
    })
    .error(function(err){
      console.log('Error: ', err);
    });

    $scope.orderBy = function(predicate){
      $scope.predicate = predicate;
      $scope.reverse = !$scope.reverse;
    }

  }]).
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
      })
      .success(function(data){
        $scope.msg = 'Cerveja ' + cerveja.name + ' criada com SUCESSO';
      })
      .error(function(err){
        console.log('Error: ', err);
        $scope.msg = 'Error:  ' + err;
      });
    }

  }]).
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
      $scope.msg = 'Error:  ' + err;
    });

  }]).
  controller('BeersEditCtrl', ['$scope', '$http', '$routeParams', 
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

    // Função de alterar
    $scope.update = function(cerveja){    
      var method = 'PUT';
      var http_settings = {
        method: method,
        url: url,
        data: cerveja
      };
      console.log('alterando', http_settings);
      $http(http_settings)
      .success(function(data){
        $scope.msg = 'Cerveja ' + cerveja.name + ' alterada com SUCESSO';
      })
      .error(function(err){
        console.log('Error: ', err);
        $scope.msg = 'Error:  ' + err;
      });
    }

  }]).
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
  }]);
