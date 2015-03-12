'use strict';

var Menu = function () {
    createjs.Container.call(this);
    this.x = 100;
    this.y = 225;
    this._init();
}

Menu.events = {
    HIDE: 'hide'
};

Menu.extend(createjs.Container, {
    _init: function () {
        var menuContainer = this._drawRectangle({x: 0, y:0, h: 500, w: 760, r: 8, color: '#333638', stroke: {color: '#3e4144', ticknes: 12}});
        var button = this._drawRectangle({x: 220, y:220, h: 60, w: 320, r: 5, color: 'red', stroke: {color: '', ticknes: 0}});
        
        var text = new createjs.Text("Start Game", "30px Orbitron", "#ffffff");
        text.x = 285;
        text.y = 230;

        this.addChild(menuContainer);
        this.addChild(button);
        this.addChild(text);

        button.on('click', function (e) {
            this.hide();
        }, this);

    },
    _drawRectangle: function(rect){
        var graphic = new createjs.Graphics()
                .setStrokeStyle(rect.stroke.ticknes)
                .beginFill(rect.color)
                .beginStroke(rect.stroke.color)
                .drawRoundRectComplex(rect.x, rect.y, rect.w, rect.h, rect.r, rect.r, rect.r ,rect.r);

        return new createjs.Shape(graphic);
    },
    hide: function () {
        
        TweenMax.to(this, 0.5, {y: -750, ease: Back.easeInOut,
            onComplete: this.dispatchEvent,
            onCompleteParams: [Menu.events.HIDE],
            onCompleteScope: this
        });
    }
});
