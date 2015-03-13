'use strict';

var Enemy = function (id) {
    createjs.Bitmap.call(this);
    this.id = id;
    this.update();
};

Enemy.events = {
    KILL: 'kill'
};

Enemy.extend(createjs.Bitmap, {
	kill: function(){
		this.dispatchEvent(Enemy.events.KILL);
	},
    update: function () {
        var enemyData = _.findWhere(data.enemies, {id: this.id}); //getting the data from the data file
        enemyData.image = images[enemyData.type];
        enemyData.w = enemyData.scaleX * 101;
        enemyData.h = enemyData.scaleY * 84;

        _.extend(this, enemyData);
  
    }
});
