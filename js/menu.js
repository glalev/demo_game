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
        var menuElements = {
            container: {x: 0, y:0, h: 500, w: 760, r: 8, color: '#333638', stroke: {color: '#3e4144', ticknes: 12}},        
            button: {x: 220, y:220, h: 60, w: 320, r: 5, color: '#8bc558', stroke: {color: '', ticknes: 0}, },
            text: {x: 305, y: 235, message: "Start Game", font: "30px Arial", color: "#ffffff"} //TODO
        };

        var menuContainer = this._drawRectangle(menuElements.container);
        var button = this._drawRectangle(menuElements.button);

        var text = new createjs.Text(menuElements.text.message, menuElements.text.font, menuElements.text.color);
        text.x = menuElements.button.x + 80;
        text.y = menuElements.button.y + 15;

        this.addChild(menuContainer);
        this.addChild(button);
        this.addChild(text);

        button.on('click', function (e) {
            createjs.Tween.get(this, {loop: false}) //TODO hide method
                .to({y: -760}, 350, createjs.Ease.getBackIn(2))
                .call(function(){
                    this.dispatchEvent(Menu.events.HIDE);
                });
        }, this);
    },

    _drawRectangle: function(rect){
        var g = new createjs.Graphics()
                .setStrokeStyle(rect.stroke.ticknes)
                .beginFill(rect.color)
                .beginStroke(rect.stroke.color)
                .drawRoundRectComplex(rect.x, rect.y, rect.w, rect.h, rect.r, rect.r, rect.r ,rect.r);

        return new createjs.Shape(g);
    }
});
