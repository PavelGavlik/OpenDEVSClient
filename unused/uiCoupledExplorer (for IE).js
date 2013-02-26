'use strict';

/*
 @fileoverview SVG coupled model rendering for Internet Explorer 8/9
 * IE does not have native SVG support. This is example how to render
 * coupled model with svgweb library (http://code.google.com/p/svgweb/)
 */

clientApp.directive('uiCoupledExplorer', ['computeCouplingSegments', 'computeSubmodelSize', 'submodelPortGap', function(computeCouplingSegments, computeSubmodelSize, submodelPortGap) {
	var data;

	function svgElement(svgRoot, elementName, attributes, textContent) {
		var el = document.createElementNS(svgns, elementName);
		for (var a in attributes)
			if (attributes.hasOwnProperty(a))
				el.setAttribute(a, attributes[a]);
		if (textContent)
			el.textContent = textContent;
		svgRoot.appendChild(el);
		return el;
	}

	function svgCircle(svgRoot, x, y, r, fill) {
		svgElement(svgRoot, 'circle', {
			cx: x,
			cy: y,
			r: r,
			stroke: 'black',
			'stroke-width': 1,
			fill: fill
		});
	}

	function svgGroup(svgRoot, x, y) {
		return svgElement(svgRoot, 'g', {
			transform: 'translate('+x+','+y+')'
		});
	}

	function svgRect(svgRoot, x, y, width, height) {
		return svgElement(svgRoot, 'rect', {
			x: x,
			y: y,
			height: height,
			width: width,
			stroke: 'black',
			'stroke-width': 1,
			fill: 'none'
		});
	}

	function svgText(svgRoot, x, y, text, other) {
		var attrs = other || {};
		angular.extend(attrs, {
			x: x,
			y: y
		});
		return svgElement(svgRoot, 'text', attrs, text);
	}

	function svgPath(svgRoot, d) {
		return svgElement(svgRoot, 'path', {
			d: d,
			style: 'stroke: black; fill: none;'
		});
	}

	function renderEach(svgRoot, collection, renderFn) {
		collection.forEach(function(item) {
			renderFn(svgRoot, item);
		});
	}

	function renderCoupling(svgRoot, coupling) {
		svgPath(svgRoot, computeCouplingSegments(coupling));
	}

	function renderPort(color, svgRoot, port) {
		var group = svgGroup(svgRoot, 0.5 + port.position.x, 0.5 + port.position.y);
		svgCircle(group, 10, 10, 10, color);
		svgText(group, 10, 35, port.name, { 'text-anchor': 'middle' });
	}
	var renderInputPort = renderPort.bind(null, 'rgb(0, 209, 0)');
	var renderOutputPort = renderPort.bind(null, 'red');

	function renderSubmodelInputPorts(svgRoot, ports) {
		var y = submodelPortGap + 10;
		for (var i = 0; i < ports.length; i++) {
			var port = ports[i];
			var group = svgGroup(svgRoot, 0, y);
			svgText(group, 13, 4, port.name);
			svgCircle(group, 5, 0, 5, 'rgb(0, 209, 0)');
			y += submodelPortGap;
		}
	}

	function renderSubmodelOutputPorts(svgRoot, ports, x) {
		var y = submodelPortGap + 10;
		for (var i = 0; i < ports.length; i++) {
			var port = ports[i];
			var group = svgGroup(svgRoot, x, y);
			svgText(group, 7, 4, port.name, { 'text-anchor': 'end' });
			svgCircle(group, 15, 0, 5, 'red');
			y += submodelPortGap;
		}
	}

	function renderSubmodel(svgRoot, submodel) {
		var position = submodel.position;
		var size = computeSubmodelSize(svgRoot, submodel);
		var group = svgGroup(svgRoot, 0.5 + position.x, 0.5 + position.y);
		svgRect(group, 10, 0, size.x, size.y);
		svgText(group, 13, 13, submodel.name, { style: 'font-weight: bold' });
		renderSubmodelInputPorts(group, submodel.inputPorts);
		renderSubmodelOutputPorts(group, submodel.outputPorts, size.x);
	}

	function renderAll() {
		var renderEachOnThis = renderEach.bind(null, this);
		renderEachOnThis(data.inputPorts, renderInputPort);
		renderEachOnThis(data.outputPorts, renderOutputPort);
		renderEachOnThis(data.components, renderSubmodel);
		renderEachOnThis(data.couplings, renderCoupling);
	}

	return {
		scope: {data: '=ngModel'},
		link: function(scope, element) {
			var svgRoot = document.createElementNS(svgns, 'svg');
			data = scope.data;
			svgRoot.addEventListener('SVGLoad', renderAll);
			window.svgweb.appendChild(svgRoot, element[0]);
		}
	};
}]);

clientApp.value('submodelPortGap', 15);

clientApp.factory('computeSubmodelSize', ['submodelPortGap', function(submodelPortGap) {
	function computeSize(svgRoot, submodel) {
		function getTextWidth(node, text) {
			node.textContent = text;
			return node.clientWidth;
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

	return computeSegments;
});