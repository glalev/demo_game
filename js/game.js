'use strict';

var Game = function (stage){
    createjs.Container.call(this);
    this.sniper = null;
    this.enemies = null;
    this.rockets = {};
    this.stats = {};
    this.appStage = stage
    this._init();
    this.pressedKeys = {};
};

Game.extend(createjs.Container, {
	_init: function () {
		this._initEnemies();
    	this.sniper = new Sniper();
    	this.addChild(this.sniper);
    	this._addListeners();
    	this.stats = {
    		timer: $('#timer'),
    		distance: $('#distance'),
    		shoots: $('#shoots'),
    		killed:  $('#killed')
    	}
	},
	_initEnemies: function (){
	
		this.enemies = new EnemyList();
		this.addChild(this.enemies);
	},
	_addListeners: function () {
		
		this.appStage.on('stagemousedown', function (e) {
	        switch (e.nativeEvent.button) {
	        	case 0:
	        		this._launchRocket(e.stageX, e.stageY);
	        		break;
	        	case 1:
	        		this.sniper.changeLaserColor();
	        		break;
	        	case 2:
	        		this.sniper.moveTo(e.stageX, e.stageY);
	            	this._drawPointer(e.stageX, e.stageY);
	            	break;
	        }
	    }, this);

	    this.appStage.on('stagemousemove', function(e) {
	        this.sniper.rotate(e.stageX, e.stageY);
	    }, this);

	    this.on('tick',this.update);
	   	
	   	var self = this; 
	    document.addEventListener('keydown', function (e){
	    	var key = e.keyCode;

	    	if (key in Config.moves){
	    		e.preventDefault();
	    		self.pressedKeys[e.keyCode] = true;
	    		self._updateKeybordInput();
	    	}
	    	
	    });

	    document.addEventListener('keyup', function (e){
	    	delete self.pressedKeys[e.keyCode];
	    });
	},

	update: function () {
		
    	var rockets = this.rockets;
    	var enemies = this.enemies.children;

	    for (var i in rockets){
	       for (var k = 0; k < enemies.length; k++){
	       		if (areColliding(rockets[i], enemies[k])) {
	                this._setExplosion(enemies[k].x + enemies[k].w/2, enemies[k].y + enemies[k].h/2);
	                rockets[i]._kill();
	                enemies[k]._kill();
	                this._updateKills();
	                break;
	           }		
	       }  
	    } //TODO createjs?

	    this._updateTimer();
	    
	},
	_updateKeybordInput: function(){
		for (var key in this.pressedKeys){
	    	if (key === '32'){
	    		this.sniper.teleport();
	    		break;
	    	}

	    	this.sniper.moveWith(Config.sniper.pace, Config.moves[key].direction);
	    }
	},
	_launchRocket: function (x, y){
		var rocket = new Rocket(this.sniper.x, this.sniper.y, this.sniper.rotation);
    	this.addChild(rocket);
    	this.rockets[rocket.id] = rocket;

	    rocket.on('kill', function (e){
	        var rocket = e.target;

	        TweenMax.killTweensOf(rocket);
	        delete this.rockets[rocket.id];
	        this.removeChild(rocket);
	    }, this);

	    this._updateShoots();
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
	},
	_updateTimer: function() {
		var sec = Math.floor(createjs.Ticker.getTime()/1000);
		//console.log(createjs.Ticker.getTime()/1000);
		if (sec > data.stats.time){
			data.stats.time = sec;
			this.stats.timer.html(sec);
		}
	},
	_updateShoots: function (){
		this.stats.shoots.html(++data.stats.shoots)
	},
	_updateDistance: function (start, distance, duration) {
		var now =  Date.now();
		var then = data.stats.distance.lastUpdate || start;
		var pxPerMilisec = distance/duration;
		var deltaTime = now - then;

		data.stats.distance.lastUpdate = now;

		data.stats.distance.value += deltaTime*pxPerMilisec;
		this.stats.distance.html(Math.round(data.stats.distance.value));
		
	},
	_updateKills: function() {
		this.stats.killed.html(++data.stats.killed)
	}
});