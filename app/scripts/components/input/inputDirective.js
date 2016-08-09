console.log('onPage');

angular.module('inputDirective', [])
.controller('InputController', ['$scope', 'TwitterService', 
	function($scope, Twit) {
      var token;
  		$scope.statuses = [];
      $scope.chatInput = "Say Something!"
      $scope.sayIt = sayit;
      $scope.send = sendReturnKey;
  		function init(){
        Twit.getToken().then(function(success){
          token = success.token.access_token;
        },
        function(failure){
          console.log("failure", failure);
        });
  		}
      function replaceRecursive(strg, sub){
        var newString = strg.replace(sub, ''),
        returnString = newString;
        if(newString.indexOf(sub) !== -1){
          returnString = replaceRecursive(newString, sub);
        }
        return returnString;
      }
      function sayit(words){
          var count = 100;
          console.log(words);
          words = replaceRecursive(words, '<br>');
          words = replaceRecursive(words, '<div>');
          words = replaceRecursive(words, '</div>');
          console.log(words);
          if(words.length < 1){
            $scope.chatInput = "Say Something?";
          } else {
            Twit.sendText(words, token, count);
            $scope.chatInput = "";
          }
      }
      function sendReturnKey(event, words){
        console.log(event);
        console.log(words);
        if(event.keyCode == 13 && !event.shiftKey){
          sayit(words);
        }
      }
  		init();

}])
.directive('input', function() {
  return {
    restrict: 'A',
    templateUrl: '/scripts/components/input/input.tmpl.html'
  };
});