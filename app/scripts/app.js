(function (angular) {
    'use strict';
    angular.module('wb.app', [
        'ngSanitize',
        'wbWrapper',
        'chat',
        'input',
        'stream'
    ]).config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
	]);
}(angular));