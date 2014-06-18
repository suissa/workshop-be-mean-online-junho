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

  }]);
