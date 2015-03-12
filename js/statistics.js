var Statistics = function (config) {

	this.time = $(config.timer);
   	this.distance = $(config.distance);
    this.shoots = $(config.shoots);
    this.killed = $(config.killed);
    this.enemyCountDown = $(config.enemyCountDown);
    this.deleteEnemyCountDown = null;
    this._init();
}

Statistics.events = {
	SECOND: 'second' 
}

Statistics.extend(createjs.EventDispatcher, {
    timer: function() {
		var sec = Math.floor(createjs.Ticker.getTime()/1000);
			
		if (sec > data.stats.time){ //a second has past
			this.update('time');
			this.dispatchEvent(Statistics.events.SECOND)
			
		}
   },
   update: function (statistic, value) {
		value = value || 1;
    	value = data.stats[statistic] + value;

		this.set(statistic, value);
    },
    set: function (statistic, value) {
       value = value || 0;

		data.stats[statistic] = value;

		if (this[statistic]){
			this[statistic].html(data.stats[statistic]);
		}
		
    },
    _init: function (){
		this.time.html(data.stats.time);
		this.distance.html(data.stats.distance);
		this.shoots.html(data.stats.shoots);
		this.killed.html(data.stats.killed);
		this.enemyCountDown.html(data.stats.enemyCountDown);
		this._displayControls(Config.containers.controlsTable);
		$('#stats').show(); 
	},
	_displayControls: function (table){
    var content = '<tr><td>Action</td><td>Key</td></tr>';

    content += _.map(Config.moves, function (value){
        return '<tr><td>' + value.action + '</td><td>' + value.key + '</td></tr>';
    }).join('');

    $(table).append(content);

	}
});
