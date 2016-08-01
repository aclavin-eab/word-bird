(function (angular) {
    'use strict';
    angular.module('contentEditable', []).directive("contenteditable", function() {
    return {
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {

      //read the text typed in the div (syncing model with the view)
      function read() {
        ngModel.$setViewValue(element.html());
      }

      //render the data now in your model into your view
      //$render is invoked when the modelvalue differs from the viewvalue
      //see documentation: https://docs.angularjs.org/api/ng/type/ngModel.NgModelController#
      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      //do this whenever someone starts typing
      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    }
  };
});
}(angular))