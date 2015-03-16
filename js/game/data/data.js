var data = {
	enemies : [
		{id: 0, x: 350, y: 25, scaleX: 0.8, scaleY: 0.8, type: 'sania', live: true},
		{id: 1, x: 150, y: 625, scaleX: 1.2, scaleY: 1.2, type: 'bobi', live: true},
		{id: 2, x: 760, y: 205, scaleX: 1.2, scaleY: 1.2, type: 'dichev', live: true},
		{id: 3, x: 460, y: 825, scaleX: 1.2, scaleY: 1.2, type: 'hrischo', live: true},
		{id: 4, x: 560, y: 255, scaleX: 1.2, scaleY: 1.2, type: 'nev', live: true},
	
	],
	enemies2: [
		{id: 0, x: 350, y: 25, scaleX: 0.8, scaleY: 0.8, type: 'sania', live: true},
		{id: 1, x: 150, y: 625, scaleX: 1.2, scaleY: 1.2, type: 'bobi', live: true},
		{id: 2, x: 760, y: 525, scaleX: 1.2, scaleY: 1.2, type: 'bobi', live: true},
		{id: 3, x: 760, y: 525, scaleX: 1.2, scaleY: 1.2, type: 'bobi', live: true},
	],
	statistics:{
		time: 0,
		shoots: 0,
		killed: 0,
		distance: 0, 
		enemyCountDown: _.random(5, 15),
		deleteEnemyCountDown: _.random(10, 25),
		lastCoord: {x:0, y:0}
	},
	timer: 0
};
