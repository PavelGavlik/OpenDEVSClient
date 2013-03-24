'use strict';

/** @extends {Scope} */
App.type.uiAtomicExplorerScope = {
	/** @type {App.model.AtomicDEVSPrototype} */
	model: null,
	/** @type {App.model.Port} */
	selectedPort: null,
	/** @type {App.model.Slot} */
	selectedSlot: null,
	selectedDelegate: null,
	/** @type {function()} */
	addInputPort: null,
	/** @type {function()} */
	addOutputPort: null,
	/** @type {function()} */
	addSlot: null,
	/** @type {function(App.model.Port)} */
	selectPort: null,
	/** @type {function(App.model.Slot)} */
	selectSlot: null,
	/** @type {function()} */
	selectDelegate: null,
	/** @type {function()} */
	renamePort: null,
	/** @type {function()} */
	renameSlot: null,
	/** @type {function()} */
	injectSlotWithValue: null,
	/** @type {function()} */
	deletePort: null,
	/** @type {function()} */
	deleteSlot: null
};

/**
 *
 * @param {App.type.uiAtomicExplorerScope} $scope
 * @param {Window} $window
 * @param {App.service.api} api
 */
App.controller.uiAtomicExplorer = function($scope, $window, api) {
	function addInputPort() {
		var name = $window.prompt('Enter input port name:');
		if (name) {
			$scope.selectedPort = $scope.model.addInputPortWithName(name);
//			var portResource = new api.Port();
//			angular.extend(portResource, $scope.selectedPort, {path: $scope.model.path});
//			portResource.$save(portResource);
		}
	}
	function addOutputPort() {
		var name = $window.prompt('Enter output port name:');
		if (name)
			$scope.selectedPort = $scope.model.addOutputPortWithName(name);
	}

	function addSlot() {
		var name = $window.prompt('Enter slot name:');
		if (name)
			$scope.selectedSlot = $scope.model.addSlot(name);
	}

	var selectPort = Util.passToObj($scope, 'selectedPort');
	var selectSlot = Util.passToObj($scope, 'selectedSlot');
	var selectDelegate = Util.passToObj($scope, 'selectedDelegate');

	function renamePort() {
		var name = $window.prompt('Enter new port name for "' + $scope.selectedPort.name + '":');
		if (name)
			$scope.selectedPort.name = name;
	}

	function renameSlot() {
		var name = $window.prompt('Enter new slot name for "' + $scope.selectedSlot.name + '":');
		if (name)
			$scope.selectedSlot.name = name;
	}

	function injectSlotWithValue() {
		var value = $window.prompt('Enter new slot value for "' + $scope.selectedSlot.name + '":');
		if (value)
			$scope.selectedSlot.value = value;
	}

	function deleteSlot() {
		$scope.model.deleteSlot($scope.selectedSlot);
		$scope.selectedSlot = null;
	}

	function deletePort() {
		$scope.model.deletePort($scope.selectedPort);
		$scope.selectedPort = null;
	}

	$scope.selectedPort = null;
	$scope.selectedSlot = null;
	$scope.selectedDelegate = null;

	$scope.addInputPort = addInputPort;
	$scope.addOutputPort = addOutputPort;
	$scope.addSlot = addSlot;
	$scope.selectPort = selectPort;
	$scope.selectSlot = selectSlot;
	$scope.selectDelegate = selectDelegate;
	$scope.renamePort = renamePort;
	$scope.renameSlot = renameSlot;
	$scope.injectSlotWithValue = injectSlotWithValue;
	$scope.deletePort = deletePort;
	$scope.deleteSlot = deleteSlot;
};

App.directive.uiAtomicExplorer = function() {
	return {
		controller: App.controller.uiAtomicExplorer,
		scope: {model: '=ngModel'},
		templateUrl: 'templates/directives/uiAtomicExplorer.html'
	};
};
