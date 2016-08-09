angular.module('streamDirective', [])
.controller('StreamController', ['$scope', 'TwitterService', function($scope, Twit, Stream) {
	var message = `"This site was put together to make a weird conversation between you and twitter using anything you say sent off
	to twitter's RESTful API tweet search, grangerizing a random selection of tweets with whatever you come up with.
	 It displays all the tweets twitter returns, revolving in the background. It's funny to think about how much data of random noise is
	 being stored out there on web servers; and most of the twitter data you'll see is just from today, in the last hour. Its a nonsensical conversation,
	  it's some sort of data recycling, it's a totally useless aplication, and it was a lot of fun to build. Hopefully it's at 
	  least a fraction of that fun to play with for someone. It was built on Angular and a stripped out bootstrap grid with a flask
	   middle tier."`
	$scope.message = message;
  	$scope.statuses = {};
  	$scope.statuses.notifications = [];
  	$scope.statuses.columnWidths = [];
  	Twit.streamTweets($scope.statuses);
  	var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
  	var revolve = function(){
        var intervalDivisor = 1;
        if($scope.statuses.notifications.length > 0){
            var randIndex = getRandomInt(0, $scope.statuses.notifications.length);
            $scope.$apply(function () {
                var shifted = $scope.statuses.notifications[randIndex].tweets.shift();
                $scope.statuses.notifications[randIndex].tweets.push(shifted);
                intervalDivisor = $scope.statuses.notifications.length
            });
        }
        setTimeout(revolve, (getRandomInt(1500, 5750) / intervalDivisor));
    };
    var removeLeft = function(){
    	$scope.statuses.notifications[0].outLeft = false;
    }
    var removeAnimate = function(){
    	$scope.statuses.notifications[0].animate = false;
    }
    var revolveOutter = function(){
        if($scope.statuses.notifications.length > 1){
            $scope.$apply(function () {
                var popped = $scope.statuses.notifications.pop();
                $scope.statuses.notifications.unshift(popped);
                $scope.statuses.notifications[0].outLeft = true;
                $scope.statuses.notifications[0].animate = true;
                setTimeout(removeLeft, 1);
                setTimeout(removeAnimate, 5000);
            });
        }
        setTimeout(revolveOutter, getRandomInt(8000, 30000));
    };
    revolve();
    revolveOutter();

}])
.directive('stream', function() {
  return {
    restrict: 'A',
    templateUrl: '/scripts/components/stream/stream.tmpl.html'
  };
});