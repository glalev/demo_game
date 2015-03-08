'use strict';

var Sniper = function () {

    createjs.Container.call(this);
    this.x = 50;
    this.y = 50;
    this.sprite = null;
};

Sniper.extend(createjs.Container, {
    init: function () {
        this.sprite = this._setSprite();
        this.laser = this._setLaser([132, 22, 22]);

    },
    moveTo: function (x, y) {
        var delta = Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));

        createjs.Tween.removeTweens(this);
        this.sprite.gotoAndPlay('run');

        createjs.Tween.get(this, {loop: false}).to({x: x, y: y}, delta*4).call(function () {
            this.sprite.gotoAndPlay('stand');
        });

    },
    rotate: function (x, y) {
        var dx = this.x - x;
        var dy = this.y - y;
        var angle = Math.atan2(dy, dx) * 180 / Math.PI;
        this.rotation = angle + 270;
    },
    changeLaserColor: (function () {
        var i = 0;
        var colors = [[22, 132, 22], [22, 22, 132],[132, 22, 22]];
        return function () {
            if (i >= colors.length) {
                i = 0;
            }

            this.laser = this._setLaser(colors[i++]);
        }
    }()),
    _setLaser: function (rgb) {
        this.removeChild(this.laser);

        var g = new createjs.Graphics()
            .beginLinearGradientFill(['rgba('+ rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 0)', 'rgba('+ rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 1)'], [0, 0.4], 1, -450, 1, 450)
            .drawRect(1, -450, 1, 450);

        var laser = new createjs.Shape(g);
        this.addChild(laser);
        return laser;
    },
    _setSprite: function () {
        if (this.sprite){
            return this.sprite;
        }
        var spritesheet = new createjs.SpriteSheet({
            images: [images.sniper],
            frames: {width: 53, height: 63, regX: 12, regY:0, count: 8},
            animations: {
                stand: 0,
                run:[0,6, "run", 0.4]
            }
        });

        var sprite =  new createjs.Sprite( spritesheet, 'stand');
        this.addChild(sprite);
        this._setSprite = null;
        return sprite;
    }
});