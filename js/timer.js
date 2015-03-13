
var Timer = function () {
	createjs.EventDispatcher.call(this);
}

Timer.events = {
	SECOND: 'second' 
};

Timer.extend(createjs.EventDispatcher,{
	update: function () {
		var sec = Math.floor(createjs.Ticker.getTime(true)/1000);

		if (sec > data.timer){ //a second has past
			this.dispatchEvent(Timer.events.SECOND);
			data.timer++;
		}
	}
});