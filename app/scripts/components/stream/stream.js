(function (angular) {
    'use strict';
    angular.module('stream', [
        'streamDirective',
        'wb.app.FakeStreamService'
    ]);
}(angular));