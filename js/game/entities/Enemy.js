'use strict';

var Enemy = function (id) {
    createjs.Bitmap.call(this);
    this.id = id;
    this.update(this.getData());
    this.x = this.sx;
    this.y = this.sy
    this.image = images[this.type];
    this.movement = this._move();
};


Enemy.extend(createjs.Bitmap, {

    update: function (enemyData) {
       
        _.extend(this, enemyData);
        if (this.live === false){
           
            this.movement.kill();
            this.image = images.skull;
            this.fadeOut();
        }

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
        return _.findWhere(data.enemies, {id: this.id});
    }, 
    _move: function (){
        var x = this.x + _.random(-200, 200);
        var y = this.y + _.random(-200, 200);
        var speed = _.random(1, 12);

        return TweenMax.to(this, speed, {
                x: x, 
                y: y,
                repeat: -1,
                yoyo: true,
                ease: Linear.easeNone
        }); 
       
    },
});
