'use strict';

var Rocket = function (x, y, angle){
    var spritesheet = new createjs.SpriteSheet({
        images: [images.rocket],
        frames: {width: 26, height: 49},
        animations: {
            fly: [0, 3, 'fly', 0.4]
        }
    });

    createjs.Sprite.call(this, spritesheet, 'fly');
    this.x = x;
    this.y = y;
    this.rotation = angle;
}

Rocket.extend(createjs.Sprite, {
    launch: function (x, y) {

        var delta = Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));

        createjs.Tween.get(this, {loop: false}).to({x: x, y: y}, delta).call(function(){
            this.parent.removeChild(this);
            this.dispatchEvent('boom');
        });
    }
});