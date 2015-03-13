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
    increment: function(statistic, value){
    	value = value || 1;
    	value = data.statistics[statistic] + value;

		this.set(statistic, value);
    },
    decrement: function (statistic, value){
    	value = value || 1;
    	value = data.statistics[statistic] - value;

		this.set(statistic, value);
    },
    set: function (statistic, value) {
       value = value || 0;

		data.statistics[statistic] = value;

		if (this[statistic]){
			this[statistic].html(data.statistics[statistic]);
		}
		
    },
    _init: function (){
		this.time.html(data.statistics.time);
		this.distance.html(data.statistics.distance);
		this.shoots.html(data.statistics.shoots);
		this.killed.html(data.statistics.killed);
		this.enemyCountDown.html(data.statistics.enemyCountDown);
		this._displayControls(Config.containers.controlsTable);
		$('#statistics').show(); 
	},
	_displayControls: function (table){
    var content = '<tr><td>Action</td><td class="centered">Key</td></tr>';

    content += _.map(Config.moves, function (value){
        return '<tr><td>' + value.action + '</td><td class="centered">' + value.key + '</td></tr>';
    }).join('');

    $(table).append(content);

	}
});
