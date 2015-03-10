'use strict';

var Game = function (stage){
    createjs.Container.call(this);
    this.sniper = null;
    this.enemies = null;
    this.rockets = {};
    this.appStage = stage
    this._init();
};

Game.extend(createjs.Container, {
	_init: function () {
		this._initEnemies();
    	this.sniper = new Sniper();
    	this.addChild(this.sniper);
    	this._addListeners();
	},
	_initEnemies: function (){
	
		this.enemies = new EnemyList();
		this.addChild(this.enemies);
	},
	_addListeners: function () {
		
		this.appStage.on('stagemousedown', function (e) {
        if(e.nativeEvent.button === 0) {             //left click
            this._launchRocket(e.stageX, e.stageY);
        }

        if(e.nativeEvent.button === 1) {             //middle click
            this.sniper.changeLaserColor();
        }

        if(e.nativeEvent.button === 2) {             //right click
            this.sniper.moveTo(e.stageX, e.stageY);
            this._drawPointer(e.stageX, e.stageY);
        }//TODO
    	}, this);

	    this.appStage.on('stagemousemove', function(e) {
	        this.sniper.rotate(e.stageX, e.stageY);
	    }, this);

	    this.on('tick',this.update);

	},

	update: function () {
		
    	var rockets = this.rockets;
    	var enemies = this.enemies.children;

	    for (var i in rockets){
	       for (var k = 0; k < enemies.length; k++){
	       		if (areColliding(rockets[i], enemies[k])) {
	                this._setExplosion(enemies[k].x + enemies[k].w/2, enemies[k].y + enemies[k].h/2);
	                rockets[i].dispatchEvent(Rocket.events.KILL);
	                enemies[k].dispatchEvent(Enemy.events.KILL);
	                break;
	           }		
	       }
	    }
	},
	_launchRocket: function (x, y){
		var rocket = new Rocket(this.sniper.x, this.sniper.y, this.sniper.rotation);
    	this.addChild(rocket);
    	this.rockets[rocket.id] = rocket;

	    rocket.on('kill', function (e){
	        var rocket = e.target;
	        this.removeChild(rocket);
	    }, this);
	},
	_drawPointer: function (x, y) {
	    var pointer = new Pointer(x, y);
	    pointer.on('kill', function(e){
	    	var pointer = e.target
	    	 this.stage.removeChild(pointer);
	    }, this);
	    this.stage.addChild(pointer);
	},
	_setExplosion: function (x, y){
	    var explosion = new Explosion(x, y);
	    this.addChild(explosion);

	    explosion.on('animationend', function (e){
	        var explosion = e.target;
	        this.removeChild(explosion);
	    }, this);
	}
});