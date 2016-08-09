angular.module('chatDirective', [])
.run(['$anchorScroll', function($anchorScroll) {
  $anchorScroll.yOffset = 200;   // always scroll by 50 extra pixels
}])
.controller('ChatController', ['$scope', '$anchorScroll', '$location', 'TwitterService', 
	function($scope, $anchorScroll, $location, Twit) {
		var callback = function() {
			var old = $location.hash();
      		$location.hash('scrollhere');
      		$anchorScroll();
      		$location.hash(old);
   		};
  		$scope.conversation = {}
  		$scope.conversation.callback = callback;
  		$scope.conversation.notifications = [];
  		Twit.makeConversation($scope.conversation);
	}]
)
.directive('chat', function() {
  return {
    restrict: 'A',
    templateUrl: '/scripts/components/chat/chat.tmpl.html'
  };
});