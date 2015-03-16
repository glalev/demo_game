var data = {
	enemies : [
		{id: 0, x: 350, y: 25, scaleX: 0.8, scaleY: 0.8, type: 'sania', live: true},
		{id: 1, x: 150, y: 625, scaleX: 1.2, scaleY: 1.2, type: 'bobi', live: true},
		{id: 2, x: 300, y: 500, scaleX: 0.6, scaleY: 0.6, type: 'dichev', live: true},
		{id: 3, x: 800, y: 205, scaleX: 0.9, scaleY: 0.9, type: 'hrischo', live: true},
		{id: 4, x: 600, y: 900, scaleX: 0.7, scaleY: 0.7, type: 'nev', live: true}
	],
	enemies2: [
		{id: 0, x: 350, y: 25, scaleX: 0.8, scaleY: 0.8, type: 'sania', live: true},
		{id: 1, x: 150, y: 625, scaleX: 1.2, scaleY: 1.2, type: 'bobi', live: true},
		{id: 2, x: 300, y: 500, scaleX: 0.6, scaleY: 0.6, type: 'dichev', live: true},
		{id: 3, x: 800, y: 265, scaleX: 0.9, scaleY: 0.9, type: 'hrischo', live: true},
		{id: 4, x: 600, y: 900, scaleX: 0.7, scaleY: 0.7, type: 'nev', live: true}
	],
	statistics:{
		time: 0,
		shoots: 0,
		killed: 0,
		distance: 0, 
		enemyCountDown: _.random(5, 15),
		deleteEnemyCountDown: _.random(1, 3),
		lastCoord: {x:0, y:0}
	},
	timer: 0
};

 var test = _.filter(data.enemies, function (enemy, i){
 	return (!_.isEqual(enemy, data.enemies2[i]));
 })