'use strict';

App.service.Point = function() {
	/**
	 * Class representing a point
	 * @param {number} x
	 * @param {number} y
	 * @constructor
	 */
	var Point = function(x, y) {
		this.x = x;
		this.y = y;
	};

	/** @typedef {{x: number, y: number}} */
	Point.Record;

	/** @type {number} */
	Point.prototype.x = 0;

	/** @type {number} */
	Point.prototype.y = 0;

	/**
	 * Creates new Point instance from regular object
	 * @param {Point.Record} p
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
	};

	return Point;
};
