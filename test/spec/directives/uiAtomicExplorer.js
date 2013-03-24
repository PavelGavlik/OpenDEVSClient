'use strict';

describe('Controller: uiAtomicExplorer', function() {
	var $scope;

	// load the controller's module
	beforeEach(module('clientApp'));

	// initialize the controller and a mock scope
	beforeEach(inject(function($controller, $rootScope, api) {
		$scope = $rootScope;
		$scope.model = new App.model.AtomicDEVSPrototype();
		var $window = { prompt: function() { return 'name' } };

		$controller('uiAtomicExplorer', {
			$scope: $scope,
			$window: $window,
			api: api
		});
	}));

	it('should be able to add port', function() {
		expect($scope.model.inputPorts.length).toBe(0);
		$scope.addInputPort();
		expect($scope.model.inputPorts.length).toBe(1);
		expect($scope.model.inputPorts[0].name).toBe('name');
		expect($scope.selectedPort).toBe($scope.model.inputPorts[0]);

		expect($scope.model.outputPorts.length).toBe(0);
		$scope.addOutputPort();
		expect($scope.model.outputPorts.length).toBe(1);
		expect($scope.model.outputPorts[0].name).toBe('name');
		expect($scope.selectedPort).toBe($scope.model.outputPorts[0]);
	});

	it("should be able to select port", function () {
		expect($scope.selectedPort).toBe(null);
		$scope.selectPort('a');
		expect($scope.selectedPort).toBe('a');
	});

	it("should be able to rename port", function () {
		$scope.model.addInputPortWithName('a');
		$scope.selectPort($scope.model.inputPorts[0]);
		$scope.renamePort();
		expect($scope.model.inputPorts[0].name).toBe('name');
	});

	it("should be able to delete port", function () {
		$scope.model.addInputPortWithName('a');
		$scope.model.addOutputPortWithName('b');
		$scope.selectPort($scope.model.inputPorts[0]);
		$scope.deletePort();
		$scope.selectPort($scope.model.outputPorts[0]);
		$scope.deletePort();
		expect($scope.selectedPort).toBe(null);
	});

	it("should be able to add slot", function () {
		expect($scope.model.slots.length).toBe(0);
		$scope.addSlot();
		expect($scope.model.slots.length).toBe(1);
		expect($scope.model.slots[0].name).toBe('name');
		expect($scope.selectedSlot).toBe($scope.model.slots[0]);
	});

	it("should be able to select slot", function () {
		expect($scope.selectedSlot).toBe(null);
		$scope.selectSlot('a');
		expect($scope.selectedSlot).toBe('a');
	});

	it("should be able to rename slot", function () {
		$scope.model.addSlot('a');
		$scope.selectSlot($scope.model.slots[0]);
		$scope.renameSlot();
		expect($scope.model.slots[0].name).toBe('name');
	});

	it("should be able to inject slot value", function () {
		$scope.model.addSlot('a');
		$scope.selectSlot($scope.model.slots[0]);
		$scope.injectSlotWithValue();
		expect($scope.model.slots[0].value).toBe('name');
	});

	it("should be able to delete slot", function () {
		$scope.model.addSlot('a');
		$scope.model.addSlot('b');
		$scope.selectSlot($scope.model.slots[0]);
		$scope.deleteSlot();
		expect($scope.model.slots[0].name).toBe('b');
		expect($scope.selectedSlot).toBe(null);
	});

	it("should be able to select delegate", function () {
		expect($scope.selectedDelegate).toBe(null);
		$scope.selectDelegate('a');
		expect($scope.selectedDelegate).toBe('a');
	});
});


describe('Directive: uiAtomicExplorer', function() {
	var element, $scope, $compile;

	beforeEach(module('clientApp'));
	beforeEach(module('templates/directives/uiAtomicExplorer.html'));
    beforeEach(module('templates/directives/uiTree.html'));
	beforeEach(inject(['$rootScope', '$compile', function($r, $c) {
		$scope = $r;
		$compile = $c;
		$scope.model = new App.model.AtomicDEVSPrototype();
	}]));

	it('should compile', function() {
		element = angular.element('<div ui-atomic-explorer ng-model="model" />');
		element = $compile(element)($scope);
		$scope.$digest();
	});
});
