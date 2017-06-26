import angular from 'angular';
// noinspection JSUnresolvedVariable
import {DefaultApi} from '../../swagger-javascript-client';

let app = angular.module('app');
let api = new DefaultApi();

app.controller('HelloCtrl', ['$scope', $scope => {
  $scope.model = {};

  api.hello({}, (error, data, response) => {
    if (error) {
    } else {
      let helloText = response.body;
      $scope.model = {helloText};
    }
    $scope.$apply();
  });
}]);
