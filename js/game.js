'use strict';

var Game = function(canvas){
    this.stage = new createjs.Stage(canvas);
    this.sniper = null;
    this.background = null;
};

Game.prototype.menuScreen = function (){

    var menu = new Menu();
    menu.init();
    this.stage.addChild(menu);

    menu.on('gameStart', function(e){
        e.remove();
        this.start();
    }, this);
};

Game.prototype.start = function (){
    this.sniper = new Sniper();

    /************TEST************/
    this.background = new createjs.Bitmap(images.background);
    this.stage.addChild(this.background);
    /************************/


    this.stage.addChild(this.sniper);
    this._addListeners();



};

Game.prototype.setExplosion = function (x, y) {
    var explosion = new Explosion(x, y);
};

Game.prototype.launchRocket = function (x, y) {
    var rocket = new Rocket(this.sniper.x, this.sniper.y, this.sniper.rotation)
    this.stage.addChild(rocket);

    rocket.launch(x, y);

    rocket.on('boom', function(e){
        e.remove();

        var explosion = new Explosion(x, y);
        explosion.on('animationend', function(e){
            e.remove();
            this.parent.removeChild(this);
        });
        this.stage.addChild(explosion);


    }, this)
};

Game.prototype.drawPointer = function (x, y){
    var pointer = new Pointer(x, y);
    pointer.x = x;
    pointer.y = y;
    this.stage.addChild(pointer);
    pointer.animation();

};


Game.prototype._addListeners = function (){

    this.stage.on('stagemousedown', function (e) {
        if(e.nativeEvent.button === 0){             //left click
            this.launchRocket(e.stageX, e.stageY);
        }

        if(e.nativeEvent.button === 2){             //right click
            this.sniper.moveTo(e.stageX, e.stageY);

            /***********TEST*************/
            var dY = (this.sniper.y - e.stageY)*0.1;
            var dX = (this.sniper.x - e.stageX)*0.1;

            var delta = Math.sqrt(Math.pow(e.stageX - this.sniper.x, 2) + Math.pow(e.stageY - this.sniper.y, 2));
            if (delta > 150){
                createjs.Tween.removeTweens(this.background);
                createjs.Tween.get(this.background, {loop: false}).to({x: this.background.y + dX, y: this.background.y + dY }, delta*3.9);
            }
            /************************/

            this.drawPointer(e.stageX, e.stageY);
        }
    }, this);

    this.stage.on('stagemousemove', function(e){
        this.sniper.rotate(e.stageX, e.stageY)
    }, this);
};