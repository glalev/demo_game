'use strict';

var EnemyList = function (){
     createjs.Container.call(this);
     this.init();
};

EnemyList.extend(createjs.Container, {
	init: function() {
		var enemies = data.enemies;

	    for (var i = 0, len = enemies.length; i < len; i++){
			this._addEnemy(enemies[i]);
		}
	},
	generateEnemy: function () {
		var config = {
			x: randomNumberBetween(0, App.dimensions.WIDTH),
			y: randomNumberBetween(0, App.dimensions.HEIGTH),
			scaleX: randomNumberBetween(5, 15)/10,
			type: Config.enemyTypes[randomNumberBetween(0, Config.enemyTypes.length-1)]
		}
		config.scaleY = config.scaleX;
		this._addEnemy(config);
	},
	removeEnemy: function () {
		
		var randomEnemyIndex = randomNumberBetween(0, this.children.length-1)
		var enemy = this.children[randomEnemyIndex];
		enemy.live = false;
		enemy.image = images.skull;
		enemy.scaleX *= 0.06; //resizing the image will do the same thing
		enemy.scaleY *= 0.06;
		if (!enemy){
			console.log('there is nothing to be killed');
			return;
		}

		TweenMax.to(enemy, 10, {
            alpha: 0, 
            ease: Linear.easeNone,
            onComplete: this.removeChildAt,
            onCompleteParams: [randomEnemyIndex],
            onCompleteScope: this
       	});    

	},
	_addEnemy: function(config) {
		var enemy = new Enemy(config.x, config.y, config.scaleX, config.scaleY, config.type);
	    this.addChild(enemy);

	    enemy.on('kill', function (e) {
	        var enemy = e.target;
	        this.removeChild(enemy);

	    }, this);
	}
});