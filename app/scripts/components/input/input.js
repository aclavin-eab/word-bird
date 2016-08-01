(function (angular) {
    'use strict';
    angular.module('input', [
        'inputDirective',
        'wb.app.TwitterService',
        'contentEditable'

    ]);
}(angular));