'use strict';

var Enemy = function (x, y, scaleX, scaleY) {
    createjs.Bitmap.call(this);
    this.image = images.rock;
    this.x = x;
    this.y = y;
    this.w = 101 * scaleX;
    this.h = 84 * scaleY;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
};

Enemy.events = {
    KILL: 'kill'
};

Enemy.extend(createjs.Bitmap);
