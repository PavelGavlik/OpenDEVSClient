'use strict';

App.service.computeCouplingSegments = function(Point) {
	/**
	 * Returns part rounded if it's number
	 * @param {String|Number} part
	 * @returns {*}
	 */
	function roundedPart(part) {
		return angular.isString(part) ?
			part :
			Math.round(part)
	}

	/**
	 * Returns a line segment of SVG path
	 * @param {Point.Record|Point} p
	 * @return {string}
	 */
	function lineSegment(p) {
		return [' L', p.x, p.y].map(roundedPart).join(' ');
	}

	/**
	 * Returns a bezier segment of SVG path
	 * @param {Point.Record|Point} p1
	 * @param {Point.Record|Point} p2
	 * @return {string}
	 */
	function bezierSegment(p1, p2) {
		return [' Q', p1.x, p1.y, p2.x, p2.y].map(roundedPart).join(' ');
	}

	/**
	 * Computes connected SVG path from points it should go through
	 * @param {Array<Point.Record>} vertices
	 * @return {string}
	 */
	function computeCouplingSegments(vertices) {
		// algorithm adapted from NCLineMorph#computeSegments
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

	return computeCouplingSegments;
};
