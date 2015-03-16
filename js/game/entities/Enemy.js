'use strict';

var Enemy = function (id) {
    createjs.Bitmap.call(this);
    this.id = id;
    this.update(this.getData());
};

Enemy.events = {
    KILL: 'kill'
};

Enemy.extend(createjs.Bitmap, {
	kill: function(){
		this.dispatchEvent(Enemy.events.KILL);
	},
    update: function (enemyData) {
        
        enemyData.image = images[enemyData.type];
        enemyData.w = enemyData.scaleX * 101;
        enemyData.h = enemyData.scaleY * 84;
        _.extend(this, enemyData);
  
    },
    fadeOut: function () {
        TweenMax.to(this, 2, {
                alpha: 0, 
                ease: Linear.easeNone,
                onComplete: Controller.remove,
                onCompleteParams: [this.id]
        }); 
    },
    getData: function () {
        //console.log(this)
        return _.findWhere(data.enemies, {id: this.id});
    }
});
