'use strict';

clientApp.directive('uiRunBlock', function() {
	function linkFn(scope, element, attrs) {
        scope.state = 'stopped';
	}

	return {
		template: '<div class="btn-toolbar"><div class="btn-group">' +
			'<button ng-click="state=\'running\'" ng-hide="state==\'running\'" class="btn">Run</button>' +
			'<button ng-click="state=\'paused\'" ng-show="state==\'running\'" class="btn">Pause</button>' +
			'<button ng-click="state=\'stopped\'" class="btn">Stop</button>' +
			'</div></div>',
		restrict: 'A',
		link: linkFn
	};
});
