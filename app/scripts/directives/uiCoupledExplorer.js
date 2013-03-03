'use strict';

clientApp.value('submodelPortGap', 15);

clientApp.directive('uiCoupledExplorer', ['submodelPortGap', function(submodelPortGap) {
	return {
		scope: {data: '=ngModel'},
		templateUrl: 'templates/directives/uiCoupledExplorer.html',
		controller: ['$scope', '$element', function($scope, $element) {
			$scope.portGap = submodelPortGap;
			$scope.rectHeight = $scope.rectWidth = 0;
			$scope.svgRoot = $element.find('svg')[0];
		}]
	};
}]);

clientApp.directive('uiCoupledSubmodel', ['$parse', 'computeSubmodelSize', function($parse, computeSubmodelSize) {
	return function(scope, element, attrs) {
		var submodel = scope.c;
		var size = computeSubmodelSize(scope.svgRoot, submodel);
		scope.rectWidth = size.x;
		scope.rectHeight = size.y;
	};
}]);

clientApp.directive('uiCoupledSubmodelCoupling', ['$parse', 'computeCouplingSegments', function($parse, computeCouplingSegments) {
	return function(scope, element, attrs) {
		var vertices = $parse(attrs.model)(scope);
		attrs.$set('d', computeCouplingSegments(vertices));
	};
}]);

clientApp.factory('computeSubmodelSize', ['submodelPortGap', function(submodelPortGap) {
	function computeSize(svgRoot, submodel) {
		function getTextWidth(node, text) {
			node.textContent = text;
			return node.getBBox().width;
		}

		function getCollectionTextWidth(collection) {
			return collection.reduce(function(maxWidth, item) {
				return Math.max(maxWidth, getTextWidth(newText, item.name));
			}, 0);
		}

		// create fake text elements and save their widths
		var newText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		svgRoot.appendChild(newText);

		var inputPortsWidth = getCollectionTextWidth(submodel.inputPorts);
		var outputPortsWidth = getCollectionTextWidth(submodel.outputPorts);
		newText.style.fontWeight = 'bold';
		var nameWidth = getTextWidth(newText, submodel.name);

		svgRoot.removeChild(newText);

		// compute final rectangle dimensions
		var size = {};
		var portsSize = inputPortsWidth + submodelPortGap + outputPortsWidth;
		if (nameWidth > portsSize)
			size.x = nameWidth + 6;
		else
			size.x = portsSize + 6;

		var portCount = Math.max(submodel.inputPorts.length, submodel.outputPorts.length);
		size.y = (portCount + 1) * submodelPortGap + 5;
		return size;
	}

	return computeSize;
}]);

clientApp.factory('computeCouplingSegments', function() {
	function pointsDist(p1, p2) {
		var dx = p2.x - p1.x;
		var dy = p2.y - p1.y;
		return Math.sqrt(dx*dx + dy*dy);
	}
	function pointsSum(p1, p2) {
		return {
			x: p1.x + p2.x,
			y: p1.y + p2.y
		};
	}
	function pointsDifference(p1, p2) {
		return {
			x: p1.x - p2.x,
			y: p1.y - p2.y
		};
	}
	function pointTimes(p, num) {
		return {
			x: p.x * num,
			y: p.y * num
		};
	}
	function pointDivided(p, num) {
		return {
			x: p.x / num,
			y: p.y / num
		};
	}
	function pointsInterpolate(p1, p2, ammount) {
		return pointsSum(p1, pointTimes(pointsDifference(p2, p1), ammount));
	}
	function pointsEqual(p1, p2) {
		return p1.x === p2.x && p1.y === p2.y;
	}

	function lineSegment(p) {
		return [' L', p.x, p.y].join(' ');
	}
	function bezierSegment(p1, p2) {
		return [' Q', p1.x, p1.y, p2.x, p2.y].join(' ');
	}

	function computeSegments(vertices) {
		// algorithm adapted from NcLineMorph#computeSegments
		var path = '';
		if (vertices.length === 2)
			path = lineSegment(vertices[0]) + lineSegment(vertices[1]);

		var v2, v3, lastUsed = vertices[0];
		for (var i = 1; i < vertices.length - 1; i++) {
			v2 = vertices[i];
			v3 = vertices[i + 1];
			var l1 = pointsDist(lastUsed, v2);
			var l2 = pointsDist(v2, v3);
			var symmetry = l1 - l2;
			var m, end;

			if (symmetry < 0) {
				m = pointDivided(pointsSum(lastUsed, v2), 2);
				end = pointsInterpolate(v2, v3, l1 / l2 / 2);
				if (!pointsEqual(lastUsed, m))
					path += lineSegment(lastUsed) + lineSegment(m);
				path += bezierSegment(v2, end);
				lastUsed = end;
			}
			else {
				m = pointDivided(pointsSum(v2, v3), 2);
				end = pointsInterpolate(v2, lastUsed, l2 / l1 / 2);
				if (!pointsEqual(lastUsed, end))
					path += lineSegment(lastUsed) + lineSegment(end);
				path += bezierSegment(v2, m);
				lastUsed = m;
			}
		}
		if (v3 && !pointsEqual(lastUsed, v3))
			path += lineSegment(v3);

		return 'M' + path.substr(2);
	}

	return computeSegments;
});