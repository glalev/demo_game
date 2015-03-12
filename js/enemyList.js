'use strict';

var EnemyList = function (){
     createjs.Container.call(this);
     this.init();
};

EnemyList.extend(createjs.Container, {
	init: function() {
		var enemies = data.enemies;

	    for (var i = 0, len = enemies.length; i < len; i++){
	        var enemy = new Enemy(enemies[i].x, enemies[i].y, enemies[i].scaleX, enemies[i].scaleY, enemies[i].type);
	        this.addChild(enemy);

	        enemy.on('kill', function (e) {
	            var enemy = e.target;
	            this.removeChild(enemy);
	        }, this);
		}
	}
});