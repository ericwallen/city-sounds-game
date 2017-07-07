var game = new Phaser.Game(1920, 1080, Phaser.Auto);

var GameState ={
  preload: function(){
    // create a sprite for the background
    this.load.image('backgroundImageKey', 'assets/images/background.png');
    this.load.image('rightArrowImageKey', 'assets/images/right-arrow.png');
    this.load.image('leftArrowImageKey', 'assets/images/left-arrow.png');

    this.load.spritesheet('dogImageKey', 'assets/images/dog-spritesheet.png', 400, 400, 3);
    this.load.spritesheet('iceSkatingImageKey', 'assets/images/ice-skating-spritesheet.png', 400, 400, 3);
    this.load.spritesheet('airplaneImageKey', 'assets/images/airplane-spritesheet.png', 400, 400, 3);
    this.load.spritesheet('fireTruckKey', 'assets/images/fire-truck-spritesheet.png', 400, 400, 3);

    this.load.audio('dogSoundKey', 'assets/sounds/dog.m4a');
    this.load.audio('iceSkatingSoundKey', 'assets/sounds/ice-skating.m4a');
    this.load.audio('airplaneSoundKey', 'assets/sounds/airplane.m4a');
    this.load.audio('fireTruckSoundKey', 'assets/sounds/fire-truck.m4a');
  },

  create: function(){
    //scales game responsively to screen size
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    //have game align horizantally and vertically
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    // create a sprite for the background
    this.backgroundSprite = this.game.add.sprite(0, 0, 'backgroundImageKey');

    //Group Items & Switch Between Them
   var cityItemData = [
     {key: 'dogImageKey', text: 'Doggy', audio: 'dogSoundKey'},
     {key: 'iceSkatingImageKey', text: 'Ice Skating', audio: 'iceSkatingSoundKey'},
     {key: 'fireTruckKey', text: 'Fire Truck', audio: 'fireTruckSoundKey'},
     {key: 'airplaneImageKey', text: 'Airplane', audio: 'airplaneSoundKey'}
   ];

   this.cityItems = this.game.add.group();

   var self = this;
   var cityItem;

   cityItemData.forEach(function(element){
     cityItem = self.cityItems.create(-1200, self.game.world.centerY, element.key, 0);

     cityItem.customParams = {text: element.text, sound: self.game.add.audio(element.audio)};
     cityItem.anchor.setTo(0.5);

     //create item animation
     cityItem.animations.add('animate', [0,1,2,0,1,2,0], 3, false)

     cityItem.inputEnabled = true;
     cityItem.input.pixelPerfectClick = true;
     cityItem.events.onInputDown.add(self.itemAnimate, self);
   });

    this.currentItem = this.cityItems.next();
    this.currentItem.position.set(self.game.world.centerX, self.game.world.centerY);

    this.leftArrowSprite = this.game.add.sprite(100, this.game.world.centerY, 'leftArrowImageKey');
    this.leftArrowSprite.anchor.setTo(0.5);
    this.leftArrowSprite.scale.setTo(1, 1);
    this.leftArrowSprite.customParams = {direction: -1};
    this.leftArrowSprite.inputEnabled = true;
    this.leftArrowSprite.input.pixelPerfectClick = true;
    this.leftArrowSprite.events.onInputDown.add(this.switchItem, this);

    this.rightArrowSprite = this.game.add.sprite(1820, this.game.world.centerY, 'rightArrowImageKey');
    this.rightArrowSprite.anchor.setTo(0.5);
    this.rightArrowSprite.scale.setTo(1, 1);
    this.rightArrowSprite.customParams = {direction: 1};
    this.rightArrowSprite.inputEnabled = true;
    this.rightArrowSprite.input.pixelPerfectClick = true;
    this.rightArrowSprite.events.onInputDown.add(this.switchItem, this);
  },

  update: function(){

  },


  // swith City Items
  switchItem: function(sprite, event){
    console.log('move item');

    var newItem, endX;

    if(sprite.customParams.direction > 0){
      newItem = this.cityItems.next();
      newItem.x = 1920;
      endX = -500;
    } else {
      newItem = this.cityItems.previous();
      newItem.x = 1920;
      endX = -500;
    }

    this.currentItem.x = endX;
    newItem.x = this.game.world.centerX;
    this.currentItem = newItem;
    },


  itemAnimate: function(sprite, event){
    console.log('I am anmimated')
    sprite.play('animate');
    sprite.customParams.sound.play(false);

  },

};

game.state.add('GameState', GameState);
game.state.start('GameState');





// var newItemMovement = this.game.add.tween(newItem);
// newItemMovement.to({x: -500}, 1000 );
// newItemMovement.start();
//
// var currentItemMovement = this.game.add.tween(this.currentItem);
// curentItemMovement.to({x: 2480}, 1000);
// curentItemMovement.start();
//
// this.currentItem = newItem;
