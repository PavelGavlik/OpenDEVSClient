'use strict';

clientApp.controller('MainCtrl', ['$scope', 'api', function($scope, api) {
	$scope.simulations = {components: []};
	$scope.items = [];
	$scope.currentItem = -1;


	$scope.openItem = function(newItem) {
		function isNotSameItem(item) {
			return item.name !== newItem.name;
		}

		if ($scope.items.every(isNotSameItem)) {
			$scope.items.push(newItem);
			$scope.currentItem = $scope.items.length - 1;
		}
	};

	$scope.selectItem = function(itemIndex) {
		$scope.currentItem = itemIndex;
	};


	api.simulations.success(function(simulations) {
		$scope.simulations = simulations;
	});
}]);
