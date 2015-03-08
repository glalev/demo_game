'use strict';

var Sniper = function (){
    var spritesheet = new createjs.SpriteSheet({
        images: [images.sniper],
        frames: {width: 53, height: 63, regX: 12, regY:0, count: 8},
        animations: {
            stand: 0,
            run:[0,6, "run", 0.4]
        }
    });

    createjs.Sprite.call(this, spritesheet, 'stand');
    this.x = 50;
    this.y = 50;
}

Sniper.extend(createjs.Sprite, {
    moveTo: function(x, y){
        var delta = Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));

        createjs.Tween.removeTweens(this);
        this.gotoAndPlay('run');

        createjs.Tween.get(this, {loop: false}).to({ x: x, y:y }, delta*4).call(function(){
            this.gotoAndPlay('stand');
        });

    },
    rotate: function (x, y) {
        var dx = this.x - x;
        var dy = this.y - y;
        var angle = Math.atan2(dy, dx) * 180 / Math.PI;
        this.rotation = angle + 275;
    }
});
