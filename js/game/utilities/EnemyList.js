'use strict';

var EnemyList = function (){
     createjs.Container.call(this);
     this.enemyCounter = 0;
     this._init();
     this._addListeners();
     this.oldData = _.clone(data.enemies);
};


EnemyList.extend(createjs.Container, {
	_init: function(){
		var len = data.enemies.length;
	    for (var i = 0, len; i < len; i++){
			this._initEnemy(this.enemyCounter++);
		}	
	},
	_updateList: function () {
		
		var added = _.difference(data.enemies, this.oldData); 
		var removed = _.difference(this.oldData, data.enemies);
		var updated = _.intersection(this.oldData, data.enemies);

		//adding all new enemies
		_.each(added, function(data){
			this._initEnemy(data.id);
		}, this);

		//removing all killed enemies
		_.each(removed, function(data){
			var child = _.findWhere(this.children, {id: data.id})
			this.removeChild(child);
		}, this);

		_.each(updated, function(data){
			var enemy = _.findWhere(this.children, {id: data.id});
			enemy.update(data);
		}, this);

		this.oldData = _.clone(data.enemies);
	

	},
	_initEnemy: function (id){
		var enemy = new Enemy(id);

		 enemy.on('kill', function (e) {
	        var enemy = e.target;
 
			Controller.update({
				type: 'skull', 
				scaleX: enemy.scaleX*0.06, 
				scaleY: enemy.scaleY*0.06, 
				live: false
			}, enemy.id);	

			enemy.fadeOut();

	    }, this);

		this.addChild(enemy);
	},
	_addListeners: function (){
		Controller.on('data_changed', function (){
			this._updateList();
		}, this);
	}
});