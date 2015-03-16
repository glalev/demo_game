'use strict';

var Explosion = function (x, y){
    createjs.Sprite.call(this);

    this.x = x;
    this.y = y;
    this._init(x, y);
};

Explosion.extend(createjs.Sprite, {
    _init: function () {
        
        this.spriteSheet = new createjs.SpriteSheet({
            images: [images.explosion],
            frames: {width: 128, height: 128, regX: 64, regY: 64},
            animations: {
                boom: [0, 39, 0, 0.7]
            }
        });
        this.gotoAndPlay('boom');
    }
});
