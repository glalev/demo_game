'use strict';

var Message = function (x, y, color, text) {
    createjs.Text.call(this);
    this.x = x;
    this.y = y;
    this.text = text;
    this.font = '10px Orbitron'
    this.color = color;
    this._init();
};
Message.events = {
    KILL: 'kill'
};

Message.extend(createjs.Text, {
   _init: function () {
        TweenMax.to(this, 0.6, {
            y: this.y - 50,
            alpha: 0.2,
            scaleX: 1.8,
            scaleY: 1.8,
            ease: Linear.easeNone,
            onComplete: this.dispatchEvent,
            onCompleteParams: [Message.events.KILL],
            onCompleteScope: this
        });
    }
});