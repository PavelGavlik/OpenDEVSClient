'use strict';

/** @extends {Scope} */
App.type.uiAtomicExplorerScope = {
	/** @type {App.model.AtomicDEVSPrototype} */
	model: null,
	/** @type {App.model.InputPort|App.model.OutputPort} */
	selectedPort: null,
	/** @type {App.model.Slot} */
	selectedSlot: null,
	/** @type {App.model.Delegate} */
	selectedDelegate: null,
	/** @type {App.model.Method} */
	selectedMethod: null,
	/** @type {function()} */
	addInputPort: null,
	/** @type {function()} */
	addOutputPort: null,
	/** @type {function()} */
	addSlot: null,
	/** @type {function()} */
	addDelegate: null,
	/** @type {function()} */
	addMethod: null,
	/** @type {function(App.model.InputPort|App.model.OutputPort)} */
	selectPort: null,
	/** @type {function(App.model.Slot)} */
	selectSlot: null,
	/** @type {function(App.model.Delegate)} */
	selectDelegate: null,
	/** @type {function(App.model.Method)} */
	selectMethod: null,
	/** @type {function()} */
	renamePort: null,
	/** @type {function()} */
	injectSlotWithValue: null,
	/** @type {function(App.model.Method)} */
	updateMethodSource: null,
	/** @type {function()} */
	deletePort: null,
	/** @type {function()} */
	deleteSlot: null,
	/** @type {function()} */
	deleteDelegate: null,
	/** @type {function()} */
	deleteMethod: null
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
			$scope.selectedPort = $scope.model.addInputPort(name);
			var portResource = new api.Port($scope.selectedPort);
			portResource.post();
		}
	}
	function addOutputPort() {
		var name = $window.prompt('Enter output port name:');
		if (name) {
			$scope.selectedPort = $scope.model.addOutputPort(name);
			var portResource = new api.Port($scope.selectedPort);
			portResource.post();
		}
	}

	function addSlot() {
		var name = $window.prompt('Enter slot name:');
		if (name) {
			$scope.selectedSlot = $scope.model.addSlot(name);
			var slotResource = new api.Slot($scope.selectedSlot);
			slotResource.post();
		}
	}

	function addDelegate() {
		var name = $window.prompt('Enter delegate path:');
		if (name) {
			var delegateName = name.match(/\w+$/)[0];
			$scope.selectedDelegate = $scope.model.addDelegate(name);
			var delegateResource = new api.Delegate($scope.selectedDelegate);
			delegateResource.post();
			$scope.selectedDelegate.rename(delegateName);
		}
	}

	function addMethod() {
		var name = $window.prompt('Enter method name:');
		if (name) {
			$scope.selectedMethod = $scope.model.addMethod(name);
			var methodResource = new api.Method($scope.selectedMethod);
			methodResource.post();
		}
	}

	var selectPort = Util.passToObj($scope, 'selectedPort');
	var selectSlot = Util.passToObj($scope, 'selectedSlot');
	var selectDelegate = Util.passToObj($scope, 'selectedDelegate');
	var selectMethod = Util.passToObj($scope, 'selectedMethod');

	function renamePort() {
		var name = $window.prompt('Enter new port name for "' + $scope.selectedPort.name + '":');
		if (name) {
			var portResource = new api.Port($scope.selectedPort);
			portResource.rename(name);
			$scope.selectedPort.rename(name);
		}
	}

	function injectSlotWithValue() {
		var value = $window.prompt('Enter new slot value for "' + $scope.selectedSlot.name + '":');
		if (value) {
			var slotResource = new api.Slot($scope.selectedSlot);
			slotResource.injectValue(value);
			$scope.selectedSlot.value = value;
		}
	}

	function updateMethodSource(method) {
		var methodResource = new api.Method(method);
		methodResource.updateSource(method.source);
	}

	function deletePort() {
		var portResource = new api.Port($scope.selectedPort);
		portResource.delete()
			.success(function() {
				$scope.model.deletePort($scope.selectedPort);
				$scope.selectedPort = null;
			})
			.error(function() {
				$window.alert('Unable to delete port.');
			});
	}

	function deleteSlot() {
		var slotResource = new api.Slot($scope.selectedSlot);
		slotResource.delete()
			.success(function() {
				$scope.model.deleteSlot($scope.selectedSlot);
				$scope.selectedSlot = null;
			})
			.error(function() {
				$window.alert('Unable to delete slot.');
			});
	}

	function deleteDelegate() {
		var delegateResource = new api.Delegate($scope.selectedDelegate);
		delegateResource.delete()
			.success(function() {
				$scope.model.deleteDelegate($scope.selectedDelegate);
				$scope.selectedDelegate = null;
			})
			.error(function() {
				$window.alert('Unable to delete delegate.');
			});
	}

	function deleteMethod() {
		var methodResource = new api.Method($scope.selectedMethod);
		methodResource.delete()
			.success(function() {
				$scope.model.deleteMethod($scope.selectedMethod);
				$scope.selectedMethod = null;
			})
			.error(function() {
				$window.alert('Unable to delete method.');
			});
	}

	$scope.$on('uiMethodEditor:sourceChanged', function(e, method) {
		updateMethodSource(method);
	});
	$scope.$on('uiMethodEditor:focus', function(e, method) {
		selectMethod(method);
	});

	$scope.selectedPort = null;
	$scope.selectedSlot = null;
	$scope.selectedDelegate = null;
	$scope.selectedMethod = null;

	$scope.addInputPort = addInputPort;
	$scope.addOutputPort = addOutputPort;
	$scope.addSlot = addSlot;
	$scope.addDelegate = addDelegate;
	$scope.addMethod = addMethod;
	$scope.selectPort = selectPort;
	$scope.selectSlot = selectSlot;
	$scope.selectDelegate = selectDelegate;
	$scope.selectMethod = selectMethod;
	$scope.renamePort = renamePort;
	$scope.injectSlotWithValue = injectSlotWithValue;
	$scope.updateMethodSource = updateMethodSource;
	$scope.deletePort = deletePort;
	$scope.deleteSlot = deleteSlot;
	$scope.deleteDelegate = deleteDelegate;
	$scope.deleteMethod = deleteMethod;
};

/**
 * Directive for manipulation with atomic models
 * Useful for editing ports, slots, delegates, methods and comment
 */
App.directive.uiAtomicExplorer = function() {
	return {
		controller: App.controller.uiAtomicExplorer,
		scope: {model: '=ngModel'},
		templateUrl: 'templates/directives/uiAtomicExplorer.html'
	};
};
