// noinspection JSUnresolvedVariable
import {DefaultApi} from '../../swagger-javascript-client';

let api = new DefaultApi();

export default ['$scope', $scope => {
  $scope.model = {};

  api.hello({}, (error, data, response) => {
    if (!error) {
      let helloText = response.body;
      $scope.model = {helloText};
    }
    $scope.$apply();
  });
}];
