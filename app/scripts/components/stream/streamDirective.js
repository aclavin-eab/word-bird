angular.module('streamDirective', [])
.controller('StreamController', ['$scope', 'FakeStreamService', function($scope, Stream) {
  $scope.thing = {
    name: 'Hulk',
    address: 'Smash'
  };
  $scope.statuses = {};
  $scope.statuses.notifications = [];
  Stream.observe($scope.statuses);

}])
.directive('stream', function() {
  return {
    restrict: 'A',
    templateUrl: '/scripts/components/stream/stream.tmpl.html'
  };
});