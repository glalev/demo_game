'use strict';

var Menu = function (){
    createjs.Container.call(this);
    this.x = 100;
    this.y = 225;
}

Menu.extend(createjs.Container, {
    init: function(){
        var rectangles = [
            {x: 0, y:0, h: 500, w: 760, r: 10, color: '#333638'},
            {x: 10, y:10, h: 480, w: 740, r: 6, color: '#3e4144'},
            {x: 220, y:220, h: 60, w: 320, r: 5, color: '#8bc558'},
        ];

        for (var i = 0, len = rectangles.length; i < len; i++){
            var g = new createjs.Graphics().beginFill(rectangles[i].color)
                .drawRoundRectComplex(rectangles[i].x, rectangles[i].y, rectangles[i].w, rectangles[i].h, rectangles[i].r, rectangles[i].r, rectangles[i].r ,rectangles[i].r);

            var s = new createjs.Shape(g);
            this.addChild(s);
        }

        this.children[2].on('click', function(e){
            e.remove();

            createjs.Tween.get(this, {loop: false})
                .to({y: this.y + 70}, 100)
                .to({y: -760}, 300, createjs.Ease.getPowIn(2))
                .call(function(){
                    this.dispatchEvent('gameStart');
                    this.parent.removeChild(this);
                });
        }, this)
    }
});
