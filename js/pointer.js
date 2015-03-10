'use strict';

var Pointer = function (x, y) {
    createjs.Shape.call(this);
    this.x = x;
    this.y = y;

    this.init();
};
Pointer.events = {
    KILL: 'kill'
};

Pointer.extend(createjs.Shape, {
    init: function() {
        this.graphics = new createjs.Graphics()
            .beginRadialGradientFill(["transparent","#ff0000"], [0, 1], 0, 0, 2, 0, 0, 3)
            .drawCircle(0, 0, 3);

        this.animation();
    },
    animation: function () {
        TweenMax.to(this, 0.3, {scaleX: 7, scaleY: 7, alpha: 0.2, ease: Linear.easeNone,
            onComplete: this.dispatchEvent,
            onCompleteParams: [Pointer.events.KILL],
            onCompleteScope: this
        });
    }
});