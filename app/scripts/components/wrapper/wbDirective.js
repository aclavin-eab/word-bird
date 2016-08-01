angular.module('wBDirective', [])
.controller('Controller', ['$scope', function($scope) {
  $scope.thing = {
    name: 'Hulk',
    address: 'Smash'
  };
}])
.directive('wbApp', function() {
  return {
    restrict: 'A',
    templateUrl: '/scripts/components/wrapper/wb.tmpl.html'
  };
});