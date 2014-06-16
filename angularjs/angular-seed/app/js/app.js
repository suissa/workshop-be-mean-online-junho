'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider' , function($routeProvider) {
  // no when nós setamos qual é a nossa rota
  // e nosso template 
  // e controller
  $routeProvider.when('/view1', {
    templateUrl: 'partials/partial1.html', 
    controller: 'MyCtrl1'
  });
  $routeProvider.when('/view2', {
    templateUrl: 'partials/partial2.html', 
    controller: 'MyCtrl2'
  });
  // na rota /beers
  // irei chamar minha index.html
  // e rodar o controller BeersIndexCtrl
  $routeProvider.when('/beers', {
    templateUrl: 'partials/beers/list.html', 
    controller: 'BeersIndexCtrl'
  });
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
