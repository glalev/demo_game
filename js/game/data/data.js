var data = {
	enemies : [
		{id: 0, sx: 350, sy: 25, scaleX: 0.8, scaleY: 0.8, type: 'sania', live: true},
		{id: 1, sx: 150, sy: 625, scaleX: 1.2, scaleY: 1.2, type: 'bobi', live: true},
		{id: 2, sx: 760, sy: 205, scaleX: 1.2, scaleY: 1.2, type: 'dichev', live: true},
		{id: 3, sx: 460, sy: 825, scaleX: 1.5, scaleY: 1.5, type: 'hrischo', live: true},
		{id: 4, sx: 560, sy: 255, scaleX: 0.9, scaleY: 0.9, type: 'nev', live: true},
		{id: 5, sx: 160, sy: 755, scaleX: 1.3, scaleY: 1.3, type: 'plamen', live: true},
		{id: 6, sx: 420, sy: 495, scaleX: 1, scaleY: 1, type: 'valeri', live: true}
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
