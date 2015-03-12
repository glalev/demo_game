'use strict';

var spreitesheets = [
    {name: 'sniper', src: 'assets/sniper.png'},
    {name: 'rocket', src: 'assets/rocket.png'},
    {name: 'explosion', src: 'assets/explosion.png'},
    {name: 'rock', src: 'assets/rock.png'},
    {name: 'bobi', src: 'assets/monsters/bobi.png'},
    {name: 'dichev', src: 'assets/monsters/dichev.png'},
    {name: 'hrischo', src: 'assets/monsters/hrischo.png'},
    {name: 'nev', src: 'assets/monsters/nev.png'},
    {name: 'plamen', src: 'assets/monsters/plamen.png'},
    {name: 'sania', src: 'assets/monsters/sania.png'},
    {name: 'valeri', src: 'assets/monsters/valeri.png'}
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
    this.ticker = createjs.Ticker.on('tick', this.stage);
};

App.prototype._startGame = function (){
    createjs.Ticker.reset();
    this._setTicker();
    
    this.game = new Game(this.stage);
    this.stage.addChild(this.game);
};

App.prototype._menuScreen = function (){
    this._setTicker();
    //this.stage.enableMouseOver(10);
    var menu = new Menu();
    this.stage.addChild(menu);
    this._displayControls();

    menu.on('hide', function (e) {
        var menu = e.target
        this.stage.removeChild(menu);
        this._startGame();
    }, this);
};

App.prototype._displayControls = function (){
    var content = '<tr><td>Action</td><td>Key</td></tr>';

    content += _.map(Config.moves, function (value){
        return '<tr><td>' + value.action + '</td><td>' + value.key + '</td></tr>';
    }).join('');

    $('#controls_table').append(content);
};

$( document ).ready(function() {
    var app = new App($('#demoCanvas')[0]);
    app._preLoad();
});

