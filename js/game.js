'use strict';

var Game = function (stage){
    createjs.Container.call(this);
    this.sniper = null;
    this.enemies = null;
    this.timer = new Timer();
    this.rockets = {};
    this.statistics = {};
    this.appStage = stage
    this._init();
    this.pressedKeys = {};
};

Game.extend(createjs.Container, {
	_init: function () {
		this._initEnemies();
    	this.sniper = new Sniper();
    	this.addChild(this.sniper);
    	this.statistics = new Statistics(Config.containers);
    	this._addListeners();
    	
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
	            	this._drawPointer(e.stageX, e.stageY, Config.laser.colors[this.sniper.laserColorNum - 1]);
	            	break;
	        }
	    }, this);

	    this.appStage.on('stagemousemove', function(e) {
	        this.sniper.rotate(e.stageX, e.stageY);
	    }, this);

	    this.on('tick',this.update);

		this.timer.on('second', function(){
			this._updateEnemyCountDown();
			this._updateDeleteEnemyCountDown();
			this.statistics.increment('time');

		}, this);

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

	    window.addEventListener('blur', function(){
	    	createjs.Ticker.paused = true;
	    })
	    window.addEventListener('focus', function(){
	    	createjs.Ticker.paused = false;
	    })
	   

	},

	update: function (e) {

    	var rockets = this.rockets;
    	var enemies = this.enemies.children;

	    for (var i in rockets){
	       for (var k = 0; k < enemies.length; k++){
	       		if (areColliding(rockets[i], enemies[k]) && enemies[k].live) {
	                this._setExplosion(enemies[k].x + enemies[k].w/2, enemies[k].y + enemies[k].h/2);
	                rockets[i].kill();
	                enemies[k].kill();
	                this.statistics.increment('killed');
	                break;
	           }		
	       }  
	    }

	    this.timer.update();
	    
	},
	_updateKeybordInput: function(){
		for (var keyCode in this.pressedKeys){
	    	if (Config.moves[keyCode].key === 'Space'){	//Spece key was pressed
	    		this.sniper.teleport();
	    		break;
	    	}

	    	//movement key/s were pressed
	    	this.sniper.moveWith(Config.sniper.pace, Config.moves[keyCode].direction);
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

	   	this.statistics.increment('shoots');
	},
	_drawPointer: function (x, y, color) {
	    var pointer = new Pointer(x, y, color);

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
	_updateEnemyCountDown: function(){		//TODO I don't like next two methods, must change them
		
		var count = data.statistics.enemyCountDown;
		
		//not enough time has past, the counter is updated
		if(count > 0){
			this.statistics.decrement('enemyCountDown');
			return;
		}

		//it's time for a new enemy, the counter is reset
		this.statistics.set('enemyCountDown', _.random(2, 10));
		this.enemies.generateEnemy();

	},
	_updateDeleteEnemyCountDown: function(){
		var count = data.statistics.deleteEnemyCountDown;
		
		if(count > 0){
			this.statistics.decrement('deleteEnemyCountDown');
			return;
		}

		this.statistics.set('deleteEnemyCountDown', _.random(5, 15));
		this.enemies.removeEnemy();
	}
});