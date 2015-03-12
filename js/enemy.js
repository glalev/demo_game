'use strict';

var Enemy = function (x, y, scaleX, scaleY, type) {
    createjs.Bitmap.call(this);
    this.image = images[type];
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

Enemy.extend(createjs.Bitmap, {
	_kill: function(){
		this.dispatchEvent(Enemy.events.KILL);
	}
});
