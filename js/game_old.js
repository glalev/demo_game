'use strict';

var Game = function (canvas){
    this.stage = new createjs.Stage(canvas);
    this.sniper = null;
    this.enemies = {};
    this.rockets = {};
};

Game.prototype.menuScreen = function () {

    var menu = new Menu();
    menu.init();
    this.stage.addChild(menu);

    menu.on('gameStart', function (e) {
        e.remove();
        this._start();
    }, this);
};

Game.prototype._start = function () {
    this._initEnemies();
    this.sniper = new Sniper();
    this.sniper.init();
    this.stage.addChild(this.sniper);

    this._addListeners();
};

Game.prototype.update = function () {
   this.stage.update();
    var rockets = this.rockets;
    var enemies = this.enemies;

    for (var i in rockets){
       for (var k in enemies){
           if(rockets[i].isColliding(enemies[k])){
                this._setExplosion(enemies[k].x + enemies[k].w/2, enemies[k].y + enemies[k].h/2);
                rockets[i].dispatchEvent('killrocket');
                enemies[k].dispatchEvent('killenemy');
                break;
           }
       }
    }
};

Game.prototype._setExplosion = function (x, y){
    var explosion = new Explosion(x, y);
    this.stage.addChild(explosion);

    explosion.on('animationend', function (e){
        e.remove();
        this.parent.removeChild(this);
    });
};

Game.prototype._launchRocket = function (x, y) {
    var rocket = new Rocket(this.sniper.x, this.sniper.y, this.sniper.rotation);
    this.stage.addChild(rocket);
    this.rockets[rocket.id] = rocket;

    rocket.launch(x, y);

    rocket.on('killrocket', function (e){
        var rocket = e.target;
        e.remove();

        delete this.rockets[rocket.id];
        this.stage.removeChild(rocket);

    }, this)
};

Game.prototype._drawPointer = function (x, y) { //DONE
    var pointer = new Pointer(x, y);
    pointer.x = x;
    pointer.y = y;
    this.stage.addChild(pointer);
    pointer.animation();
};


Game.prototype._addListeners = function () {

    this.stage.on('stagemousedown', function (e) {
        if(e.nativeEvent.button === 0) {             //left click
            this._launchRocket(e.stageX, e.stageY);
        }

        if(e.nativeEvent.button === 1) {             //middle click
            this.sniper.changeLaserColor();
        }

        if(e.nativeEvent.button === 2) {             //right click
            this.sniper.moveTo(e.stageX, e.stageY);
            this._drawPointer(e.stageX, e.stageY);
        }
    }, this);

    this.stage.on('stagemousemove', function(e) {
        this.sniper.rotate(e.stageX, e.stageY);
    }, this);
};

Game.prototype._initEnemies = function () { //DONE

    var enemies = [
        {x: 350, y: 25, scaleX: 0.8, scaleY: 0.8},
        {x: 150, y: 625, scaleX: 0.5, scaleY: 0.5},
        {x: 300, y: 500, scaleX: 0.6, scaleY: 0.6},
        {x: 800, y: 205, scaleX: 0.8, scaleY: 0.8},
        {x: 600, y: 900, scaleX: 0.7, scaleY: 0.7}
    ];

    for (var i = 0, len = enemies.length; i < len; i++){
        var enemy = new Enemy(enemies[i].x, enemies[i].y, enemies[i].scaleX, enemies[i].scaleY, enemies[i].angle);
        this.enemies[enemy.id] = enemy;
        this.stage.addChild(enemy);

        enemy.on('killenemy', function (e) {
            var enemy = e.target;

            e.remove();
            delete this.enemies[enemy.id];
            this.stage.removeChild(enemy);

        }, this)
    }

    this._initEnemies = null;
};