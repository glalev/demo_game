'use strict';

var spreitesheets = [
    {name: 'sniper', src: 'assets/sniper.png'},
    {name: 'rocket', src: 'assets/rocket.png'},
    {name: 'explosion', src: 'assets/explosion.png'},
    {name: 'rock', src: 'assets/rock.png'}
];

var images = {}

var App = function (canvas){
    this.game = null;
    this.ticker = null;
    this.stage = new createjs.Stage(canvas);
};

App.prototype._preLoad = function (){
    var preload = new createjs.LoadQueue();
    preload.on("fileload", this._handleFileComplete);
    preload.on("complete", this._menuScreen, this);
    preload.loadManifest(spreitesheets);
};

App.prototype._handleFileComplete = function (e){
    images[e.item.name] = e.result;
};

App.prototype._setTicker = function (){
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    this.ticker =  createjs.Ticker.on('tick', this.stage);
};

App.prototype._startGame = function (){
    this.game = new Game(this.stage);
    this.stage.addChild(this.game);
};

App.prototype._menuScreen = function (){
    this._setTicker();
    var menu = new Menu();
    this.stage.addChild(menu);

    menu.on('hide', function (e) {
        var menu = e.target
        this.stage.removeChild(menu);
        this._startGame();
    }, this);
};

var app = new App(document.getElementById('demoCanvas'));
app._preLoad();
