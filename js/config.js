var Config = {
	sniper: {
		pace: 20,
		teleportDistance: 400,
		speedDelay: 4
	},
	laser: {
		colors: ['#ff0000','#00ff00', '#0055ff', '#ffff00', '#ff00ff', '#00ffff'],
		width: 450,
		height: 1
	},
	moves: {
		32: {direction: '', action: 'Teleport', key: 'Space'},
		65: {direction: 'left', action: 'Move Left', key: 'D'},
		68: {direction: 'right', action: 'Move Right', key: 'A'},
		83: {direction: 'back',  action: 'Move Backward', key: 'S'},
		87: {direction: 'forward', action: 'Move Forward', key: 'W'},
	},
	corrections: {
		left: {sinX:0, sinY:-1, cosX:-1, cosY: 0},
		right: {sinX:0, sinY:1, cosX:1, cosY: 0},
		forward: {sinX:1, sinY:0, cosX:0, cosY: -1},
		back: {sinX:-1, sinY:0, cosX:0, cosY: 1}
	},
	enemyTypes: ['dichev', 'hrischo', 'nev', 'plamen', 'sania', 'valeri'],
	containers: {
		timer: '#timer', 
    	distance: '#distance', 
    	shoots: '#shoots', 
    	killed: '#killed',
    	enemyCountDown:'#enemy_count_down',
    	controlsTable: '#controls_table'
    }
};

  /*
	37: {direction: 'left', action: 'Move Left', key: 'Left'},
		38: {direction: 'forward', action: 'Move Forward', key: 'Up'},
		39: {direction: 'right', action: 'Move Right', key: 'Right'},
		40: {direction: 'back', action: 'Move Backward', key: 'Down'},

  */