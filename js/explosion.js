'use strict';

var Explosion = function (x, y){
    var spritesheet = new createjs.SpriteSheet({
        images: [images.explosion],
        frames: {width: 128, height: 128},
        animations: {
            boom: [0, 39, 0, 0.7]
        }
    });

    createjs.Sprite.call(this, spritesheet, 'boom');
    this.x = x;
    this.y = y;
}

Explosion.extend(createjs.Sprite);
