(function (angular) {
    'use strict';
    angular.module('wb.app.TwitterService', [])
        .service('TwitterService', ['$http', '$q', '$log', TwitterService]);

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
    }

    var count = 100,
        lastData,
        chainRepeat,
        chainRepeated,
        conversationObservers = [],
        tweetStreamObservers = [],
        splitStrings = function(words) {
            var splitCount = Math.floor(words.length / 3),
                part1 = words.slice(0, splitCount),
                part2 = words.slice(splitCount, 2 * splitCount),
                part3 = words.slice(2 * splitCount);
            return [part1, part2, part3];
        },
        getRandomInt = function(min, max) {
            return Math.floor(Math.random() * ((max + 1) - min)) + min;
        },
        handleChain = function(data){
            for (var i = 0; i < data.length; i++){
                var columnWidth = getRandomInt(1, 100);
                for(var j = 0; j < data[i].tweets.statuses.length; j++){
                    var odds = (getRandomInt(1, 8));
                    data[i].tweets.statuses[j].textSize = columnWidth >= 70 ? (getRandomInt(8, 80)).toString() + 'px': odds > 5  && columnWidth >= 50? (getRandomInt(10, 16)).toString() + 'px': '14px';
                }
                tweetStreamObservers.forEach(function(observer){
                    observer.notifications.unshift({tweets: data[i].tweets.statuses, columnWidth: columnWidth});
                });
            }
            addConversation(data);
        },
        addConversation = function(data){
            var divider = data.length;
            var conversationText = '';
            lastData = data;
            for (var i = 0; i < divider; i++){
                if(data[i].tweets.statuses.length > 0){
                    var randIndex = getRandomInt(0, data[i].tweets.statuses.length - 1),
                        spliceBegin = Math.floor(data[i].tweets.statuses[randIndex].text.length / divider * (i)),
                        spliceEnd = Math.floor(data[i].tweets.statuses[randIndex].text.length / divider * (i + 1));
                        conversationText = conversationText + data[i].tweets.statuses[randIndex].text.slice(spliceBegin, spliceEnd);
                    } else {
                        conversationText = conversationText + ' Ummmmm... '
                    }
            }
            conversationObservers.forEach(function(observer){
                observer.notifications.push({"response": true, "text": conversationText});
                setTimeout(observer.callback, 200);
            });
            if(chainRepeated < chainRepeat){
                var odds = getRandomInt(1, 2);
                chainRepeated += 1;
                console.log('oddo', odds);
                if (odds > 1) {
                    setTimeout(function(){addConversation(lastData)}, getRandomInt(1500, 8000));
                }
            }
        };
    
    TwitterService.prototype.sendText = function(words, token, count){
        var apiPrepWords = [];
        var promiseChain = [];
        conversationObservers.forEach(function(observer){
            observer.notifications.push({"response": false, "text": words});
            setTimeout(observer.callback, 200);
        });

        //check for 3 spaces
        if ((words.indexOf(' ', words.indexOf(' ') + 1) > 0) && (words.indexOf(' ', words.indexOf(' ', words.indexOf(' ') + 1) + 1) > 0)){
            apiPrepWords = splitStrings(words);
        } else {
            apiPrepWords.push(words)
        }

        for (var i = 0; i < apiPrepWords.length; i++){
            promiseChain.push(this.getTweets(apiPrepWords[i], token, count));
        }
        this.$q.all(promiseChain).then(handleChain);
        chainRepeat = getRandomInt(0, 5);
        chainRepeated = 0;
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
    TwitterService.prototype.makeConversation = function(observer){
        conversationObservers.push(observer);
    };
    TwitterService.prototype.streamTweets = function(observer){
        tweetStreamObservers.push(observer);
    }

}(angular));


