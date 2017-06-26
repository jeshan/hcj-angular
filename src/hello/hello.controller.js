import angular from 'angular';

let app = angular.module('app');

app.controller('HelloCtrl', $scope => {
  $scope.model = {
    helloText: 'Hello my world'
  };
});
