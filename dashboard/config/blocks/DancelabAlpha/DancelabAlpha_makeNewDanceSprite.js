
function makeNewDanceSprite(costume, name, location) {
  if (!location) {
    location = {x: 200, y: 200};
  }

  var sprite = createSprite(location.x, location.y);

  sprite.maxSpeed = 0;
  sprite.style = costume;
  if (!sprites_by_type.hasOwnProperty(costume)) {
    sprites_by_type[costume] = createGroup();
  }
  sprites_by_type[costume].add(sprite);
  sprite.current_move = 0;
  sprite.previous_move = 0;
  for (var i=0; i < dancers[costume].length; i++) {
    sprite.addAnimation("anim" + i, dancers[costume][i]);
  }
  sprite.animation.stop();
  sprites.add(sprite);
  sprite.speed = 10;
  sprite.sinceLastFrame = 0;
  sprite.dance_speed = 1;
  sprite.behaviors = [];

  // Add behavior to control animation
  addBehavior(sprite, function() {
    var delta = 1 / (frameRate() + 0.01) * 1000;
    sprite.sinceLastFrame += delta;
    var msPerBeat = 60 * 1000 / (song_meta.bpm * (sprite.dance_speed / 2));
    var msPerFrame = msPerBeat / 48;
    while (sprite.sinceLastFrame > msPerFrame) {
      sprite.sinceLastFrame -= msPerFrame;
      sprite.animation.nextFrame();
      var currentFrame = sprite.animation.getFrame();
      if (currentFrame === 0) {
        sprite.mirrorX(-sprite.mirrorX());
      } else if (currentFrame === sprite.animation.getLastFrame() && !sprite.animation.looping) {
        changeMove(sprite, sprite.current_move);
        sprite.animation.looping = true;
      }
    }
  });

  sprite.setSpeed = function (speed) {
    sprite.speed = speed;
  };

  sprite.moveUp = function () {
    sprite.y = sprite.y - sprite.speed;
  };
  sprite.moveDown = function () {
    sprite.y = sprite.y + sprite.speed;
  };
  sprite.moveLeft = function () {
    sprite.x = sprite.x - sprite.speed;
  };
  sprite.moveRight = function () {
    sprite.x = sprite.x + sprite.speed;
  };
  sprite.jump = function () {
    sprite.velocityY = -7;
  };
  sprite.setTint = function (color) {
    sprite.tint = color;
  };
  sprite.removeTint = function () {
    sprite.tint = null;
  };

  sprite.setPosition = function (position) {
    if (position === "random") {
      sprite.x = randomNumber(50, 350);
      sprite.y = randomNumber(50, 350);
    } else {
      sprite.x = position.x;
      sprite.y = position.y;
    }
  };
  sprite.setScale = function (scale) {
    sprite.scale = scale;
  };
  return sprite;
}