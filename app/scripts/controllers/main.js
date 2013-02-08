'use strict';

clientApp.controller('MainCtrl', ['$scope', 'api', function($scope, api) {
	$scope.simulations = {components: []};
	$scope.items = [];
	$scope.currentItemName = '';


	$scope.openItem = function(newItem) {
		function isNotSameItem(item) {
			var isNotSame = item.name !== newItem.name;
			if (!isNotSame)
				$scope.selectItem(item);
			return isNotSame;
		}

		if ($scope.items.every(isNotSameItem)) {
			$scope.items.push(newItem);
			$scope.currentItemName = newItem.name;
		}
	};

	$scope.selectItem = function(item) {
		$scope.currentItemName = item.name;
	};


	api.simulations.success(function(simulations) {
		$scope.simulations = simulations;
	});
}]);
