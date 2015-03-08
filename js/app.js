'use strict';

var spreitesheets = [
    {name: 'sniper', src: 'assets/sniper.png'},
    {name: 'rocket', src: 'assets/rocket.png'},
    {name: 'explosion', src: 'assets/explosion.png'},
    {name: 'rock', src: 'assets/rock.png'}
]

var images = {}

var App = function (canvas){
    this.game = null;
    this.ticker = null;
}

App.prototype._preLoad = function (){
    var preload = new createjs.LoadQueue();
    preload.on("fileload", this._handleFileComplete);
    preload.on("complete", this._startGame, this);
    preload.loadManifest(spreitesheets);
};

App.prototype._handleFileComplete = function (e){
    images[e.item.name] = e.result;
}

App.prototype._setTicker = function (){
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    this.ticker =  createjs.Ticker.on('tick', function(){
        this.game.update();
    },this);


}

App.prototype._startGame = function (){
    this.game = new Game(document.getElementById('demoCanvas'));
    this.game.menuScreen();
    this._setTicker();
}

var app = new App();
app._preLoad();
