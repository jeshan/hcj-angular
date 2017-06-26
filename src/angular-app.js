import angular from 'angular';
import '@uirouter/angularjs';

let app = angular.module('app', ['ui.router']);

// declare "global" constants here

app
  .value('global1', 1)
  .value('global2', 2);

app.config(['$stateProvider', $stateProvider => {
  // TODO: define your routes here
  $stateProvider
    .state({
      name: 'hello',
      url: '/hello',
      controller: 'HelloCtrl',
      templateUrl: 'hello/hello.html'
    });
}]);
