var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 240 },
            debug: false
        }
    },
    scene: [Scene1, Scene2, Scene3]
};
// Gravedad cambiada

var game = new Phaser.Game(config);

var score;
var gameOver;

var player;
var stars;
var bombs;
var platforms;
var movingPlatform;
var cursors;
var scoreText;
var platforms2;
var platforms3;
var timedEvent;
var initialTime;
var timeText;
var gameOver = false;
var keyR;
var level = 0;
