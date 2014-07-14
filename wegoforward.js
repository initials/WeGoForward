
var game = new Phaser.Game(585, 365, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var BootState = require('Boot');
game.state.add('boot', BootState);

function preload() {

    //game.load.spritesheet('wegoforward', 'art/spritesheet_x1.png', 500, 308);
    game.load.spritesheet('frame_6', 'art/frame_6_bg.png', 117, 73);
    game.load.spritesheet('raindrop_1', 'art/raindrop_1.png', 10, 10);
    game.load.spritesheet('raindrop_2', 'art/raindrop_2.png', 10, 10);
    game.load.spritesheet('frame_6_collide1', 'art/frame_6_collide1.png', 39, 17);
    game.load.spritesheet('frame_6_collide2', 'art/frame_6_collide2.png', 73, 15);
    game.load.spritesheet('frame_6_collide3', 'art/frame_6_collide3.png', 5, 17);
    game.load.spritesheet('cloud', 'art/clouds.png', 30, 15);
}

//sprites
var story;
var frame_6;

var rain;

var cloud;
var clouds;
var frame_6_collide1;

var spriteGround;
var score;
var tweet;
var TWEET_PREAMBLE = 'https://twitter.com/intent/tweet?text=We Go Forward ';
var TWEET_PROLOGUE = ' http://www.initialsgames.com/wegoforward/ &hashtags=wegoforward ';

function create() {
    score=0;
    tweet = document.getElementById('tweet');
    //alert(tweet.href);
    tweet.href = TWEET_PREAMBLE + score + TWEET_PROLOGUE;


    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#000000';

    //  For browsers that support it, this keeps our pixel art looking crisp (works across Canvas and WebGL)

    //  You can either set smoothing on a specific sprite, like this:
    // boss.smoothed = false;

    //  Or across the whole stage, like this:
    game.stage.smoothed = false;
    
    //frame 6
    frame_6 = game.add.sprite(0,0, 'frame_6');
    frame_6.scrollfactor = 0;
    frame_6.scale.set(5) ;

    rain = game.add.emitter(game.world.centerX, 0, 200);
    rain.width=game.world.width;

    //  Here we're passing an array of image keys. It will pick one at random when emitting a new particle.
    rain.makeParticles(['raindrop_1', 'raindrop_2']);
    rain.minRotation = 0;
    rain.maxRotation = 0;
    rain.minParticleSpeed.x = 0;
    rain.maxParticleSpeed.x = 0;
    rain.minParticleSpeed.y = 100;
    rain.maxParticleSpeed.y = 200;

    rain.start(false, 5000, 20);

    clouds = game.add.group();
    for (var i = 0; i < 4; i++) {
        cloud = clouds.create((i*215),20+(game.rnd.integerInRange(0, 40)), 'cloud');
        cloud.scale.set(5);
        cloud.animations.add('1'+i, [i], 0, true);
        cloud.enableBody = true;
        game.physics.enable(cloud, Phaser.Physics.ARCADE);
        cloud.body.velocity.x = 20 + game.rnd.integerInRange(0, 30);
    }

    //collide object for pellets.
    frame_6_collide1 = game.add.sprite(0,  280, 'frame_6_collide1');
    frame_6_collide1.scale.setTo(5);
    game.physics.enable(frame_6_collide1, Phaser.Physics.ARCADE);
    frame_6_collide1.body.immovable = true;
    frame_6_collide1.body.bounce.setTo(0.3, 0.3);

    frame_6_collide2 = game.add.sprite(200,  300, 'frame_6_collide2');
    frame_6_collide2.scale.setTo(5);
    game.physics.enable(frame_6_collide2, Phaser.Physics.ARCADE);
    frame_6_collide2.body.immovable = true;
    frame_6_collide2.body.bounce.setTo(0.3, 0.3);

    frame_6_collide3 = game.add.sprite(560,  280, 'frame_6_collide3');
    frame_6_collide3.scale.setTo(5);
    game.physics.enable(frame_6_collide3, Phaser.Physics.ARCADE);
    frame_6_collide3.body.immovable = true;
    frame_6_collide3.body.bounce.setTo(0.3, 0.3);
    
}

function update() {

    game.physics.arcade.collide(rain, frame_6_collide1);
    game.physics.arcade.collide(rain, frame_6_collide2);
    game.physics.arcade.collide(rain, frame_6_collide3);

    clouds.forEach(function(item) {
        if (item.x>650){
            item.x=-200;
        }

    });


    if (game.input.mousePointer.isDown)
    {
        game.state.start('boot');

    }
}

function render () {

    // game.debug.text(game.time.physicsElapsed, 32, 32);
    // game.debug.body(player);
    // game.debug.bodyInfo(player, 16, 24);

}
