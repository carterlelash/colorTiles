import Phaser from 'phaser';

const game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var snake;
var apple;
var cursors;

function preload() {
    game.load.image('snake', 'snake.png');
    game.load.image('apple', 'apple.png');
}

function create() {
    snake = game.add.group();
    apple = game.add.sprite(300, 300, 'apple');

    cursors = game.input.keyboard.createCursorKeys();

    for(var i = 0; i < 3; i++) {
        var segment = snake.create(150+i*20, 150, 'snake');
    }
}

function update() {
    if (cursors.right.isDown) {
        snake.x += 10;
    } else if (cursors.left.isDown) {
        snake.x -= 10;
    } else if (cursors.up.isDown) {
        snake.y -= 10;
    } else if (cursors.down.isDown) {
        snake.y += 10;
    }

    game.physics.overlap(snake, apple, collectApple, null, this);
}

function collectApple(snake, apple) {
    apple.kill();
    var newSegment = snake.create(snake.children[snake.length-1].x, snake.children[snake.length-1].y, 'snake');
    apple.reset(Math.random()*750, Math.random()*550);
}
