(function (angular) {
    'use strict';
    angular.module('wb.app.ConversationService', [])
        .service('ConversationService', ['$log', ConservationService]);

    function ConservationService() {
        this.observers = [];
    }


    ConservationService.prototype.observe = function(observer) {
        this.observers.push(observer);
    };

    ConservationService.prototype.notify = function(notification) {
        this.observers.forEach(function(observer){
            observer.notifications.push(notification);
        });
    };

}(angular));