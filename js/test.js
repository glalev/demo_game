'use strict';

Function.prototype.extend = function (parent, methods){
    this.prototype = Object.create(parent.prototype);
    this.prototype.constructor = this;

    for(var key in methods){
        this.prototype[key] = methods[key];
    }
}
