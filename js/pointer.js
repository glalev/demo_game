'use strict';

var Pointer = function (x,y){
    var graphics = new createjs.Graphics().beginRadialGradientFill(["rgba(132, 22, 24, 0)","#831618"], [0, 1], 0, 0, 2, 0, 0, 3).drawCircle(0, 0, 3);

    createjs.Shape.call(this, graphics);
}

Pointer.extend(createjs.Shape, {
    animation: function () {
        createjs.Tween.get(this, {loop: false}).to({scaleX: 4, scaleY: 4}, 200)
            .to({scaleX: 7, scaleY: 7, alpha: 0.2}, 200)
            .call(function(){
            this.parent.removeChild(this);
        });
    }
});