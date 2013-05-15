'use strict';

App.value.submodelPortGap = 15;

App.controller.uiCoupledExplorer = function(api, $scope, $element, $window, computeSubmodelSize, computeCouplingSegments) {
	function randomPortPosition() {
		return Math.floor(Math.random() * 300) + 10;
	}

	function addInputPort() {
		var name = $window.prompt('Enter input port name:');
		if (name) {
			var port = $scope.model.addInputPort(name);
			port.position = {x: randomPortPosition(), y: randomPortPosition()};
			var portResource = new api.Port(port);
			redrawSubmodels($scope.model.components);
			portResource.post();
		}
	}

	function addOutputPort() {
		var name = $window.prompt('Enter output port name:');
		if (name) {
			var port = $scope.model.addOutputPort(name);
			port.position = {x: randomPortPosition(), y: randomPortPosition()};
			var portResource = new api.Port(port);
			redrawSubmodels($scope.model.components);
			portResource.post();
		}
	}

	function addAtomic() {
		var name = $window.prompt('Enter atomic DEVS name:');
		if (name) {
			var atomic = new App.model.AtomicDEVSPrototype({name: name});
			atomic.position = {x: randomPortPosition(), y: randomPortPosition()};
			$scope.model.addComponent(atomic);
			var atomicResource = new api.MyRepositoryItem(atomic);
			redrawSubmodels($scope.model.components);
			atomicResource.post();
		}
	}

	function addCoupled() {
		var name = $window.prompt('Enter coupled DEVS name:');
		if (name) {
			var coupled = new App.model.CoupledDEVSPrototype({name: name});
			coupled.position = {x: randomPortPosition(), y: randomPortPosition()};
			$scope.model.addComponent(coupled);
			var coupledResource = new api.MyRepositoryItem(coupled);
			redrawSubmodels($scope.model.components);
			coupledResource.post();
		}
	}

	/**
	 * @param {Array<App.model.CoupledDEVSPrototype|App.model.AtomicDEVSPrototype>} submodels
	 */
	function redrawSubmodels(submodels) {
		if (!submodels || !submodels.length)
			return;

		submodels.forEach(function(submodel) {
			var size = computeSubmodelSize($scope.svgRoot, submodel);
			submodel.rectWidth = size.x;
			submodel.rectHeight = size.y;
		});
	}

	/**
	 * @param {Array} couplings
	 */
	function redrawCouplings(couplings) {
		if (!couplings || !couplings.length)
			return;

		couplings.forEach(function(coupling) {
			coupling.segments = computeCouplingSegments(coupling);
		});
	}

	$scope.portGap = App.value.submodelPortGap;
	$scope.rectHeight = $scope.rectWidth = 0;
	$scope.svgRoot = $element.find('svg')[0];

	$scope.$watch('model.components', redrawSubmodels);
	$scope.$watch('model.couplings', redrawCouplings);

	$scope.addAtomic = addAtomic;
	$scope.addCoupled = addCoupled;
	$scope.addInputPort = addInputPort;
	$scope.addOutputPort = addOutputPort;
};

/**
 * Directive for manipulation with coupled models
 * Shows graphical model representation using SVG
 */
App.directive.uiCoupledExplorer = function() {
	return {
		controller: App.controller.uiCoupledExplorer,
		scope: {model: '=ngModel'},
		templateUrl: 'templates/directives/uiCoupledExplorer.html'
	};
};
