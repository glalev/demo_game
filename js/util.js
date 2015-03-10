'use strict';

Function.prototype.extend = function(baseClass, methods) {
	this.prototype = extend(baseClass, methods);
	this.prototype.constructor = this; //IDEA: use propertiesObject to define getter/setters and to remove _.extend bellow
	// this.prototype.super = base; //TODO: need to find another aproach because this doesn't work after the second inheritance
};

function extend(baseClass, methods) {
	var obj = {};
	if (baseClass && baseClass.prototype) {
		obj = Object.create(baseClass.prototype);
	} else { //inherits Object
		methods = baseClass;
	}

	for (var prop in methods) {
		obj[prop] = methods[prop];
	}

	return obj;
}

function getDelta (x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function areColliding(object1, object2){
	var x = object1.x;
    var y = object1.y;
    var r = object1.x + object1.w;
    var b = object1.y + object1.h;

    var x2 = object2.x;
    var y2 = object2.y;
	var r2 = object2.x + object2.w;
	var b2 = object2.y + object2.h;

	return !(r <= x2 || x > r2 ||
        b <= y2 || y > b2);
}

function angleBetweenPoints(x1, y1, x2, y2){
	var dx = x2 - x1;
    var dy = y2 - y1;

    return Math.atan2(dy, dx) * 180 / Math.PI;
}