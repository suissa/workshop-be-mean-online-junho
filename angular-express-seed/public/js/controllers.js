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
  controller('BeersIndexCtrl', ['$scope', function ($scope) {
    $scope.workshop = 'Workshop Be MEAN';

    // Código colado do exercicio 08
    $scope.reverse = false;
    $scope.predicate = 'price';
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

  }]);
