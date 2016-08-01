(function (angular) {
    'use strict';
    angular.module('chat', [
        'chatDirective',
        'wb.app.ConversationService'
    ]);
}(angular));