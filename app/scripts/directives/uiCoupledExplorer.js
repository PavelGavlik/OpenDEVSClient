'use strict';

clientApp.directive('uiCoupledExplorer', function() {
	return {
		scope: {data: '=ngModel'},
		templateUrl: 'templates/directives/uiCoupledExplorer.html',
		restrict: 'AE',
		link: function(scope) {
			scope.portGap = 15;

			scope.rectHeight = 0;
			scope.rectWidth = 150;
		}
	};
});

clientApp.directive('uiCoupledSubmodel', function() {
	function linkFn(scope, elm) {
		function getTextWidth(node, text) {
			node.textContent = text;
			return node.clientWidth;
		}

		function getCollectionTextWidth(collection) {
			return collection.reduce(function(maxWidth, port) {
				return Math.max(maxWidth, getTextWidth(newText, port.name));
			}, 0);
		}

		// create fake text elements and save their widths
		var newText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		elm[0].appendChild(newText);

		var inputPortsWidth = getCollectionTextWidth(scope.c.inputPorts);
		var outputPortsWidth = getCollectionTextWidth(scope.c.outputPorts);
		newText.style.fontWeight = 'bold';
		var nameWidth = getTextWidth(newText, scope.c.name);

		elm[0].removeChild(newText);


		// compute final rectangle dimensions
		var portsSize = inputPortsWidth + scope.portGap + outputPortsWidth;
		if (nameWidth > portsSize)
			scope.rectWidth = nameWidth + 6;
		else
			scope.rectWidth = portsSize + 6;

		var portCount = Math.max(scope.c.inputPorts.length, scope.c.outputPorts.length);
		scope.rectHeight = (portCount + 1) * scope.portGap + 5;
	}

	return {
		restrict: 'AC',
		link: linkFn
	};
});

clientApp.directive('uiCoupledSubmodelCoupling', function() {
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
		return ' L' + p.x + ' ' + p.y;
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

	return {
		restrict: 'AC',
		scope: {data: '=ngModel'},
		link: function(scope, elm, attrs) {
			attrs.$set('d', computeSegments(scope.data));
		}
	};
});