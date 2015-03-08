'use strict';

var Rocket = function (x, y, angle) {
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
    this.w = 26;
    this.h = 49;
    this.rotation = angle;
};

Rocket.extend(createjs.Sprite, {
    launch: function (x, y) {

        var dx = x + Math.sin(this.rotation*Math.PI/180)*1000;
        var dy = y - Math.cos(this.rotation*Math.PI/180)*1000;
        var delta = Math.sqrt(Math.pow(dx - this.x, 2) + Math.pow(dy - this.y, 2));

        createjs.Tween.get(this, {loop: false}).to({x: dx, y: dy}, delta).call(function () {
            this.dispatchEvent('killrocket');
        });
    },
    isColliding: function (object) {
        var x = this.x;
        var y = this.y;
        var r = this.x + this.w;
        var b = this.y + this.h;

        var x2 = object.x;
        var y2 = object.y;
        var r2 = object.x + object.w;
        var b2 = object.y + object.h;

        return !(r <= x2 || x > r2 ||
        b <= y2 || y > b2);
    }
});