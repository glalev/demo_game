var Controller = extend(createjs.EventDispatcher, {
	insert: function (item) {
		data.enemies.push(item);
		Controller.dispatchEvent(Controller.events.CHANGE);
		
	},
	remove: function(id){ 
		data.enemies = _.without(data.enemies, _.findWhere(data.enemies, {id: id}));
		Controller.dispatchEvent(Controller.events.CHANGE);

	},
	update: function(newData, id){
		enemy = _.findWhere(data.enemies, {id: id});
		_.extend(enemy, newData);
		
		Controller.dispatchEvent(Controller.events.CHANGE);;
	}
});

Controller.events = {
	CHANGE: 'data_changed'
}