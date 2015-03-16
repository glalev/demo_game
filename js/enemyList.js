'use strict';

var EnemyList = function (){
     createjs.Container.call(this);
     this.enemyCounter = 0;
     this._init();
     this._addListeners();
};


EnemyList.extend(createjs.Container, {
	
	generateEnemy: function (){
		
		var enemy = {
			id: this.enemyCounter++,
			x: _.random(0, App.dimensions.WIDTH),
			y: _.random(0, App.dimensions.HEIGTH),
			scaleX: _.random(5, 15)/10,
			type: Config.enemyTypes[_.random(0, Config.enemyTypes.length-1)]
		}

		enemy.scaleY = enemy.scaleX;
		enemy.live = true;

		Controller.insert(enemy);
	},
	removeEnemy: function () {
		var len = this.children.length
		if (len < 3){ //there are too few enemies
			return;
		}

		var randomEnemyIndex = _.random(0, len-1)
		var enemy = this.children[randomEnemyIndex];

		enemy.kill();

	},
	_init: function(){
		var len = data.enemies.length;
	    for (var i = 0, len; i < len; i++){
			this._initEnemy(this.enemyCounter++);
		}	
	},
	_updateList: function () {
		
		var oldIds = _.pluck(this.children, 'id');
		var newIds = _.pluck(data.enemies, 'id');
		
		var added = _.difference(newIds, oldIds);
		var removed = _.difference(oldIds, newIds);

		//enemy was added
		if (added.length > 0){ 
			_.each(added, function(id){
				this._initEnemy(id);
			}, this);

			return;
		}

		//enemy was removed
		if(removed.length > 0){ 
			_.each(removed, function(id){
				var enemy = _.findWhere(this.children, {id: id});
				this.removeChild(enemy);
			}, this);
			return;
		}

		//no enemy was added or removed therefore some enemy was updated
		_.each(this.children, function(enemy){
			enemy.update();
		}, this)

	},
	_initEnemy: function (id){
		var enemy = new Enemy(id);

		 enemy.on('kill', function (e) {
	        var enemy = e.target;
	        
			Controller.update({type: 'skull', scaleX: enemy.scaleX*0.06, scaleY: enemy.scaleY*0.06, live: false}, enemy.id);
			
			TweenMax.to(enemy, 2, {
	            alpha: 0, 
	            ease: Linear.easeNone,
	            onComplete: Controller.remove,
	            onCompleteParams: [enemy.id]
	       	});  
	    }, this);

		this.addChild(enemy);
	},
	_addListeners: function (){
		Controller.on('data_changed', function (){
			this._updateList();
		}, this);
	}
});