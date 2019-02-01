/*
Zerlin
TCSS 491 - Computational Worlds
Joshua Atherton, Michael Josten, Steven Golob
*/
/*
Zerlin
TCSS 491 - Computational Worlds
Joshua Atherton, Michael Josten, Steven Golob
*/
class AssetManager {
    constructor() {
        this.successCount = 0;
        this.errorCount = 0;
        this.cache = [];
        this.downloadQueue = [];
    }
    queueDownload(path) {
        console.log("Queueing " + path);
        this.downloadQueue.push(path);
    }
    isDone() {
        return this.downloadQueue.length === this.successCount + this.errorCount;
    }
    downloadAll(callback) {
        for (var i = 0; i < this.downloadQueue.length; i++) {
            var img = new Image();
            var that = this;
            var path = this.downloadQueue[i];
            console.log(path);
            img.addEventListener("load", function () {
                console.log("Loaded " + this.src);
                that.successCount++;
                if (that.isDone())
                    callback();
            });
            img.addEventListener("error", function () {
                console.log("Error loading " + this.src);
                that.errorCount++;
                if (that.isDone())
                    callback();
            });
            img.src = path;
            this.cache[path] = img;
        }
    }
    getAsset(path) {
        return this.cache[path];
    }
}


var AM = new AssetManager();

AM.queueDownload("img/stars.png");
AM.queueDownload("img/backgroundTrees1.png");
AM.queueDownload("img/backgroundTrees2.png");
AM.queueDownload("img/backgroundTrees3.png");
AM.queueDownload("img/backgroundTrees4.png");
AM.queueDownload("img/droid-j-row.png");

AM.queueDownload("img/forestLeftTile.png"); //tiles are 60x60
AM.queueDownload("img/forestMiddleTile.png");
AM.queueDownload("img/forestRightTile.png");

AM.queueDownload("img/batLeft.png");
AM.queueDownload("img/batRight.png");

AM.queueDownload("img/boy-run-Right.png");
AM.queueDownload("img/boy-idle.png");
AM.queueDownload("img/boy-run-Left.png");
AM.queueDownload("img/boy-jump-right.png");
AM.queueDownload("img/boy-jump-left.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);

    //setup and add the scrolling background
    const parallaxBackgroundManager = new ParallaxBackgroundManager(gameEngine); 
    parallaxBackgroundManager.addBackgroundImage(
        new ParallaxBackground(gameEngine, AM.getAsset('img/backgroundTrees4.png'), 
        2, 0, 0));
    parallaxBackgroundManager.addBackgroundImage(
        new ParallaxBackground(gameEngine, AM.getAsset('img/stars.png'), 
        3, 0, 0));
    parallaxBackgroundManager.addBackgroundImage(
        new ParallaxBackground(gameEngine, AM.getAsset('img/backgroundTrees3.png'), 
        4, 0, 0));
    parallaxBackgroundManager.addBackgroundImage(
        new ParallaxBackground(gameEngine, AM.getAsset('img/backgroundTrees2.png'), 
        5, 0, 0));
    parallaxBackgroundManager.addBackgroundImage(
        new ParallaxBackground(gameEngine, AM.getAsset('img/backgroundTrees1.png'), 
        6, 0, 0));
    gameEngine.addEntity(parallaxBackgroundManager);
    
    //add some droids
    gameEngine.addEntity(new Droid(gameEngine, AM.getAsset("img/droid-j-row.png"), 150, 150));
    gameEngine.addEntity(new Droid(gameEngine, AM.getAsset("img/droid-j-row.png"),400, 300));
    gameEngine.addEntity(new Droid(gameEngine, AM.getAsset("img/droid-j-row.png"), 745, 50));
    gameEngine.addEntity(new Droid(gameEngine, AM.getAsset("img/droid-j-row.png"), 1000, 420));

    //add the ground tiles
    gameEngine.addEntity(new Tile(gameEngine,
             10, 10, [AM.getAsset('img/forestLeftTile.png'), 
             AM.getAsset('img/forestMiddleTile.png'),
             AM.getAsset('img/forestRightTile.png'), '']));

    gameEngine.addEntity(new Bat(gameEngine, 1150, 00, 'left'));
    gameEngine.addEntity(new Bat(gameEngine, 1500, 250, 'left'));
    gameEngine.addEntity(new Bat(gameEngine, -120, 200, 'right'));
    gameEngine.addEntity(new Bat(gameEngine, -700, 100, 'right'));

    //add main character
    gameEngine.addEntity(new Boy(gameEngine));

    gameEngine.start();
    console.log("All Done!");
});


