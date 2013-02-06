'use strict';

clientApp.directive('uiRunBlock', function() {
	function linkFn(scope, element, attrs, ctrl) {
        scope.state = 'stopped';
   //      ctrl.$render = function() {
			// scope.state = ctrl.$viewValue || 'stopped';
   //      };

   //      scope.$watch('state', function(state) {
			// ctrl.$setViewValue(state);
   //      });
	}

	return {
		// require: 'ngModel',
		scope: {state: '@ngModel'},
		template: '<div class="btn-toolbar">{{state}}<div class="btn-group">' +
			'<button ng-click="state=\'running\'" ng-hide="state==\'running\'" class="btn">Run</button>' +
			'<button ng-click="state=\'paused\'" ng-show="state==\'running\'" class="btn">Pause</button>' +
			'<button ng-click="state=\'stopped\'" class="btn">Stop</button>' +
			'</div></div>',
		restrict: 'AE',
		link: linkFn
	};
});
