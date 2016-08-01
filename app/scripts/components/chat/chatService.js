(function (angular) {
    'use strict';
    angular.module('wb.app.ConversationService', [])
        .service('ConversationService', ['$http', '$q', '$log', TwitterService]);

    function TwitterService($http, $q) {
    	this.$http = $http;
    	this.$q = $q;
    }

    TwitterService.prototype.getToken = function() {

        var defer  = this.$q.defer();

        this.$http.get("http://127.0.0.1:5000/oauth").then(function(res){
            defer.resolve(res.data);
        }, function(err){
            defer.reject(err.data);
        });

        return defer.promise;
    };

     TwitterService.prototype.getTweets = function(words, token, count = 15) {

        var defer  = this.$q.defer();

        this.$http.get("http://127.0.0.1:5000/tweets", {
            params : {q: words, token: token}
        }).then(function(res){
            defer.resolve(res.data);
        }, function(err){
            defer.reject(err.data);
        });

        return defer.promise;
    };

}(angular));