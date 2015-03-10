'use strict';

var Sniper = function () {

    createjs.Container.call(this);
    this.x = 50;
    this.y = 50;
    this.w = 56;
    this.h = 63;
    this.speedDelay = 4;
    this.laserColorNum = 0;
    this.sprite = null;
    this._init();

};

Sniper.extend(createjs.Container, {
    _init: function () {
        this.sprite = this._setSprite();
        this.laser = this._setLaser();

    },
    moveTo: function (x, y) {
        var duration = getDelta(x, y, this.x, this.y) * this.speedDelay; 

        createjs.Tween.removeTweens(this);
        this.sprite.gotoAndPlay('run');

        createjs.Tween.get(this, {loop: false}).to({x: x, y: y}, duration).call(function () {
            this.sprite.gotoAndPlay('stand');
        });

    },
    rotate: function (x, y) {
        var angle = angleBetweenPoints(this.x, this.y, x, y) + 90;
        this.rotation = angle;
    },
    changeLaserColor: function () {
        this.laser = this._setLaser();
    },
    _setLaser: function () {
        this.removeChild(this.laser);

        if (this.laserColorNum >= Config.laser.colors.length){
            this.laserColorNum = 0;
        }
        var color = Config.laser.colors[this.laserColorNum++];
        
        var graphic = new createjs.Graphics()
            .beginLinearGradientFill(['transparent', color], [0, 0.4], Config.laser.height, -Config.laser.width, Config.laser.height, Config.laser.width)
            .drawRect(1, -450, 1, 450); //TODO

        var laser = new createjs.Shape(graphic);
        this.addChild(laser);
        return laser;
    },
    _setSprite: function () {
        var spritesheet = new createjs.SpriteSheet({
            images: [images.sniper],
            frames: {width: 53, height: 63, regX: 12, regY:0, count: 8},
            animations: {
                stand: 0,
                run:[0,6, "run", 0.4]
            }
        });

        var sprite =  new createjs.Sprite(spritesheet, 'stand');
        this.addChild(sprite);
        return sprite;
    }
});