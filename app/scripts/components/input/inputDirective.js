console.log('onPage');

angular.module('inputDirective', [])
.controller('InputController', ['$scope', '$q', 'TwitterService', 'ConversationService', 'FakeStreamService',
	function($scope, $q, Twit, ConversationService, FSS) {
      var token;
  		$scope.statuses = [];
      $scope.chatInput = "Say Something!"
      $scope.sayIt = sayit;
  		function init(){
        Twit.getToken().then(function(success){
          token = success.token.access_token;
        },
        function(failure){
          console.log("failure", failure);
        });
        setTimeout(revolve, 2000);
  		}
      function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min)) + min;
      }
      function revolve(){
        var intervalDivisor = 1;
        if($scope.statuses.length > 0){
          var randIndex = getRandomInt(0, $scope.statuses.length);
          $scope.$apply(function () {
            var shifted = $scope.statuses[randIndex].shift();
            $scope.statuses[randIndex].push(shifted);
            intervalDivisor = $scope.statuses.length
          });
        }
        setTimeout(revolve, (getRandomInt(0, 2000) / intervalDivisor));
      }
      function sayit(words){
          var count = 100,
          apiPrepWords = [],
          promiseChain = [],
          handleChain = function(data){
              for (var i = 0; i < data.length; i++){
                  $scope.statuses.unshift(data[i].tweets.statuses);
                  FSS.notify(data[i].tweets.statuses);
              }
              var divider = data.length;
              var conversationText = '';
              for (var i = 0; i < divider; i++){
                  if(data[i].tweets.statuses.length > 0){
                  var spliceBegin = Math.floor(data[i].tweets.statuses[0].text.length / divider * (i)),
                      spliceEnd = Math.floor(data[i].tweets.statuses[0].text.length / divider * (i + 1));
                  conversationText = conversationText + data[i].tweets.statuses[0].text.slice(spliceBegin, spliceEnd);
                  } else {
                      conversationText = conversationText + ' Ummmmm... '
                  }
              }
              ConversationService.notify({"response": true, "text": conversationText});
          }
          ConversationService.notify({"response": false, "text": words});
          $scope.chatInput = "";

          //check for 3 spaces
          if ((words.indexOf(' ', words.indexOf(' ') + 1) > 0) && (words.indexOf(' ', words.indexOf(' ', words.indexOf(' ') + 1) + 1) > 0)){
            apiPrepWords = splitString(words);
          } else {
            apiPrepWords.push(words)
          }
          for (var i = 0; i < apiPrepWords.length; i++){
            promiseChain.push(Twit.getTweets(apiPrepWords[i], token, count));
          }
          $q.all(promiseChain).then(handleChain);

          /*Twit.getTweets(words, token, count).then(function(data){
            $scope.statuses.push(data.tweets.statuses);
            $scope.conversation.push({"response": true, "text": data.tweets.statuses[1].text})
          },
          function(failure){
            console.log("failure", failure);
          });*/
      }
      function splitString(words){
        var splitCount = Math.floor(words.length / 3);
        part1 = words.slice(0, splitCount);
        part2 = words.slice(splitCount, 2 * splitCount);
        part3 = words.slice(2 * splitCount);
        return [part1, part2, part3];
      }

  		init();

}])
.directive('input', function() {
  return {
    restrict: 'A',
    templateUrl: '/scripts/components/input/input.tmpl.html',
  };
});