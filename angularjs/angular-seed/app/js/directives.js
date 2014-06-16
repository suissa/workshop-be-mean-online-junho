'use strict';

/* Directives */


angular.module('myApp.directives', []).
// injetando o service version
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
