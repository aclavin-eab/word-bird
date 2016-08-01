angular.module('chatDirective', [])
.controller('ChatController', ['$scope', 'ConversationService', function($scope, ConversationService) {
  $scope.conversation = {}
  $scope.conversation.notifications = [];
  ConversationService.observe($scope.conversation);
}])
.directive('chat', function() {
  return {
    restrict: 'A',
    templateUrl: '/scripts/components/chat/chat.tmpl.html'
  };
});