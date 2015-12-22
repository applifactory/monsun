app.directive('text', function($compile, TextService){
  return {
    restrict: 'A',
    scope: true,
    template: function(tElement, tAttrs) {
      tElement.data('content', tElement.html());
      if ( tAttrs.hasOwnProperty('editor') )
        return '<text-angular ng-model="content" ng-model-options="{ updateOn: \'default blur\', debounce: { \'default\': 1000, \'blur\': 0 } }" ta-toolbar="[[\'bold\',\'italics\', \'ul\', \'ol\', \'insertLink\']]"></text-angular>';
      else
        return '<div class="contenteditable" contenteditable ng-model="content" ng-model-options="{ updateOn: \'default blur\', debounce: { \'default\': 1000, \'blur\': 0 } }"></div>';
    },
    compile: function compile(tElement, tAttrs, transclude) {
      return {
        pre: function preLink(scope, iElement, iAttrs, controller) {
          scope.content = tElement.data('content');
        },
        post: function(scope, iElement, iAttrs, controller) {
          var id = iAttrs.text;
          iAttrs.$observe('ngModel', function(val){
            var model = scope.$eval(val);
            if ( model )
              scope.content = model;
          });
          scope.$watch('content', function(text, oldText){
            if (text != oldText) {
              if ( iAttrs.onUpdate )
                scope.$eval(iAttrs.onUpdate, {attr: id, value: text});
              else
                TextService.update(id, text);
            }
          })
        }
      }
    }
  }
})
