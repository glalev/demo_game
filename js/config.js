var Config = {
	laser: {
		colors: ['#ff0000','#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
		width: 450,
		height: 1
	},
	moves: {
		65: 'left',
		68: 'right',
		83: 'back',
		87: 'forward',
		32: 'teleport'
	},
	corrections: {
		left: {sinX:0, sinY:-1, cosX:-1, cosY: 0},
		right: {sinX:0, sinY:1, cosX:1, cosY: 0},
		forward: {sinX:1, sinY:0, cosX:0, cosY: -1},
		back: {sinX:-1, sinY:0, cosX:0, cosY: 1}
	}
};
 