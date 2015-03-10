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
    this.isMoving = false;
    this.isTeleporting = false;
    this._init();

};

Sniper.extend(createjs.Container, {
    _init: function () {
        this.sprite = this._setSprite();
        this.laser = this._setLaser();

    },
    moveTo: function (x, y) {
        var duration = getDelta(x, y, this.x, this.y) * this.speedDelay; 
        TweenMax.to(this, duration/1000, {x: x, y: y, ease: Linear.easeNone, onComplete: this.stop, onCompleteScope: this});

        this.run();
    },
    moveWith: function (pace, direction){
        if (this.isTeleporting){
            return;
        }

        var corection = this.corectCoordinates(direction);
        var dx = this.x + corection.x*pace;
        var dy = this.y + corection.y*pace;

        this.moveTo(dx, dy);
    },
    rotate: function (x, y) {
        var angle = angleBetweenPoints(this.x, this.y, x, y) + 90;
        this.rotation = angle;
    },
    changeLaserColor: function () {
        this.laser = this._setLaser();
    },
    stop: function (){
        this.sprite.gotoAndPlay('stand');
        this.isMoving = false;
        this.isTeleporting = false;
    },
    run: function () {
        if(this.isMoving){
            return;
        }
        
        this.isMoving = true;
        this.sprite.gotoAndPlay('run');
    },
    corectCoordinates: function(direction){
        var dx = Math.sin(this.rotation*Math.PI/180)*Config.corrections[direction].sinX + Math.cos(this.rotation*Math.PI/180)*Config.corrections[direction].cosX;
        var dy = Math.sin(this.rotation*Math.PI/180)*Config.corrections[direction].sinY + Math.cos(this.rotation*Math.PI/180)*Config.corrections[direction].cosY;

        return {x:dx, y:dy}
    },
    teleport: function(){
        this.isTeleporting = true; 

        var corection = this.corectCoordinates('forward');
        var dx = corection.x*400;
        var dy = corection.y*400;
        
        var timeline = new TimelineMax();
        timeline.to(this, 0.3, {x: this.x + dx*0.5, y: this.y + dy*0.5, alpha: 0, ease:Cubic.easeIn})
                .to(this, 0.6, {x: this.x + dx, y: this.y + dy})
                .to(this, 0.2, {alpha: 1, ease:Cubic.easeOut, onComplete: this.stop, onCompleteScope: this}, '-=0.2');
    },
    _setLaser: function () {
        this.removeChild(this.laser);

        if (this.laserColorNum >= Config.laser.colors.length){
            this.laserColorNum = 0;
        }
        var color = Config.laser.colors[this.laserColorNum++];
        
        var graphic = new createjs.Graphics()
            .beginLinearGradientFill(['transparent', color], [0, 0.4], Config.laser.height, -Config.laser.width, Config.laser.height, Config.laser.width)
            .drawRect(Config.laser.height, -Config.laser.width, Config.laser.height, Config.laser.width);

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