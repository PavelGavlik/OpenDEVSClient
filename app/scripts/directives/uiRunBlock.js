'use strict';

App.directive.uiRunBlock = function(api) {
	return {
		link: function(scope) {
			function changeRunningState(willBeRunning) {
				scope.loading = true;
				api.simulations.changeRunningState(scope.data.rootSolver(), willBeRunning).success(function() {
					scope.loading = false;
					scope.data.running = willBeRunning;
				}).error(function() {
					alert('Unable to change simulation running state.');
					scope.loading = false;
				});
			}

			scope.start = changeRunningState.bind(null, true);
			scope.stop = changeRunningState.bind(null, false);
		},
		scope: {data: '=ngModel'},
		templateUrl: 'templates/directives/uiRunBlock.html'
	};
};
