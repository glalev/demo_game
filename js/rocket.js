'use strict';

var Rocket = function (x, y, angle) {
    createjs.Sprite.call(this);

    this.w = 26;
    this.h = 49;
    this.x = x;
    this.y = y;
    this.rotation = angle;

    this._init();
    
};

Rocket.events = {
    KILL: 'kill'
};

Rocket.extend(createjs.Sprite, {
    _init: function () {
        this.spriteSheet  = new createjs.SpriteSheet({
            images: [images.rocket],
            frames: {width: 26, height: 49},
            animations: {
                fly: [0, 3, 'fly', 0.4]
            }
        });

        this.gotoAndPlay('fly');
        
        this.launch();
    },
    launch: function (x, y) {
        var destination = this._getDestination(x, y); //coordinates of the destination point
        var duration = getDelta(destination.x, destination.y, this.x, this.y); 
       
        createjs.Tween.get(this, {loop: false}).to({x: destination.x, y: destination.y}, duration).call(function () {
            this.dispatchEvent(Rocket.events.KILL);
        });
    },
    _getDestination: function (x, y){
        var dx = this.x + Math.sin(this.rotation*Math.PI/180)*1500;
        var dy = this.y - Math.cos(this.rotation*Math.PI/180)*1500;
        return {x: dx, y: dy}
    }
});

