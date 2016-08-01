(function (angular) {
    'use strict';
    angular.module('wb.app.FakeStreamService', [])
        .service('FakeStreamService', ['$log', FSS]);

    function FSS() {
        this.observers = [];
    }

    FSS.prototype.observe = function(observer) {
        this.observers.push(observer);
    };

    FSS.prototype.notify = function(notification) {
        this.observers.forEach(function(observer){
            observer.notifications.unshift(notification);
        });
    };

}(angular));