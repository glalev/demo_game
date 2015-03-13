var Controller = extend(createjs.EventDispatcher, {
	insert: function (item) {
		var container = data.enemies;
		
		if(_.isArray(container)){
			container.push(item);
			var e = new createjs.Event(Controller.events.CHANGE);
			e.itemId =item.id;
			Controller.dispatchEvent(e);
		}

	},
	remove: function(id){ 
		
		data.enemies = _.without(data.enemies, _.findWhere(data.enemies, {id: id}));

		var e = new createjs.Event(Controller.events.CHANGE);
		e.itemId = id;
		Controller.dispatchEvent(e);
	},
	update: function(newData, id){
		enemy = _.findWhere(data.enemies, {id: id});
		_.extend(enemy, newData);

		var e = new createjs.Event(Controller.events.CHANGE);
		e.itemId = id;
		Controller.dispatchEvent(e)
	}
});

Controller.events = {
	CHANGE: 'data_changed'
}