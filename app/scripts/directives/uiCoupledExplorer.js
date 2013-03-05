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
	/** @type {{x: number, y: number}} */
	var PointRecord;

	/**
	 * Class representing a point
	 * @param {number} x
	 * @param {number} y
	 * @constructor
	 */
	function Point(x, y) {
		/** @type {number} */
		this.x = x;
		/** @type {number} */
		this.y = y;
	}

	/**
	 * Creates new Point instance from regular object
	 * @param {PointRecord} p
	 * @return {Point}
	 */
	Point.fromObject = function(p) {
		return new Point(p.x, p.y);
	};

	/**
	 * Returns new point which is sum of this point and p
	 * @param {Point} p
	 * @return {Point}
	 */
	Point.prototype.plus = function(p) {
		return new Point(this.x + p.x, this.y + p.y);
	};

	/**
	 * Computes difference of two points
	 * @param {Point} p
	 * @return {Point}
	 */
	Point.prototype.minus = function(p) {
		return new Point(this.x - p.x, this.y - p.y);
	};

	/**
	 * Computes distance between this and p
	 * @param {Point} p
	 * @return {number}
	 */
	Point.prototype.distTo = function pointsDist(p) {
		var dx = p.x - this.x;
		var dy = p.y - this.y;
		return Math.sqrt(dx*dx + dy*dy);
	};

	/**
	 * Computes product of this point and number
	 * @param {number} num
	 * @return {Point}
	 */
	Point.prototype.timesNum = function(num) {
		return new Point(this.x * num, this.y * num);
	};

	/**
	 * Computes division of this point and number
	 * @param {number} num
	 * @return {Point}
	 */
	Point.prototype.divideByNum = function(num) {
		return new Point(this.x / num, this.y / num);
	};

	/**
	 * Interpolation between two points with given ammount
	 * @param {Point} p
	 * @param {number} ammount
	 * @return {Point}
	 */
	Point.prototype.interpolateTo = function(p, ammount) {
		return this.plus(p.minus(this).timesNum(ammount));
	};

	/**
	 * Return true if coordinates of two points are equal
	 * @param {Point} p
	 * @return {boolean}
	 */
	Point.prototype.isEqual = function(p) {
		return this.x === p.x && this.y === p.y;
	}


	/**
	 * Returns a line segment of SVG path
	 * @param {PointRecord|Point} p
	 * @return {string}
	 */
	function lineSegment(p) {
		return [' L', p.x, p.y].join(' ');
	}

	/**
	 * Returns a bezier segment of SVG path
	 * @param {PointRecord|Point} p1
	 * @param {PointRecord|Point} p2
	 * @return {string}
	 */
	function bezierSegment(p1, p2) {
		return [' Q', p1.x, p1.y, p2.x, p2.y].join(' ');
	}

	/**
	 * Computes connected SVG path from points it should go through
	 * @param {Array<PointRecord>} vertices
	 * @return {string}
	 */
	function computeSegments(vertices) {
		// algorithm adapted from NcLineMorph#computeSegments
		var path = '';
		if (vertices.length === 2)
			path = lineSegment(vertices[0]) + lineSegment(vertices[1]);

		var v2, v3, lastUsed = Point.fromObject(vertices[0]);
		for (var i = 1; i < vertices.length - 1; i++) {
			v2 = Point.fromObject(vertices[i]);
			v3 = Point.fromObject(vertices[i + 1]);
			var l1 = lastUsed.distTo(v2);
			var l2 = v2.distTo(v3);
			var symmetry = l1 - l2;
			var m, end;

			if (symmetry < 0) {
				m = lastUsed.plus(v2).divideByNum(2);
				end = v2.interpolateTo(v3, l1 / l2 / 2);
				if (!lastUsed.isEqual(m))
					path += lineSegment(lastUsed) + lineSegment(m);
				path += bezierSegment(v2, end);
				lastUsed = end;
			}
			else {
				m = v2.plus(v3).divideByNum(2);
				end = v2.interpolateTo(lastUsed, l2 / l1 / 2);
				if (!lastUsed.isEqual(end))
					path += lineSegment(lastUsed) + lineSegment(end);
				path += bezierSegment(v2, m);
				lastUsed = m;
			}
		}
		if (v3 && !lastUsed.isEqual(v3))
			path += lineSegment(v3);

		return 'M' + path.substr(2);
	}

	return computeSegments;
});