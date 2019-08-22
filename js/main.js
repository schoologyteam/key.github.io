

var player,obstacle,groundContainer;
var spawnPositionX,spawnPositionY;
var count = 0;

var configItems = {
    backgroundColor : 0xbb1542,
    groundColor : 0x252525,
    obstacleColor : 0x252525,
    playerColor : 0xfff6da,
    noOfGround : 2,
    height : window.innerHeight,
    width : window.innerWidth,
    spawnX : 0,
    spawnY : window.innerHeight * .35 - 12.5,
    playerSpeed : 400,
};

export default class Main extends Phaser.Scene{

    constructor(){
        super('main');
    }

    preload(){
        this.cameras.main.setBackgroundColor(configItems.backgroundColor);
        this.load.image('tile','assets/tile.jpg');
        this.load.image('flare','assets/flare.png');
        this.load.audio('bck','assets/background1.mp3');
        this.scale.lockOrientation('landscape');
    }

    create(){
        this.backgroundAudio = this.sound.add('bck');
        //Enable this at the end
       // this.backgroundAudio.play();
        //this.backgroundAudio.loop = true;

        spawnPositionX = configItems.spawnX;
        spawnPositionY = configItems.spawnY;
       
          //Adding Ground
          groundContainer = this.physics.add.staticGroup();
          let ground =  this.physics.add.staticImage(0,configItems.height * .65,'tile');
              ground.setOrigin(0,0);
              ground.displayWidth = configItems.width + 200;
              ground.displayHeight = 25;
              ground.tint = configItems.groundColor;
              ground.refreshBody();
              groundContainer.add(ground);


        this.spawnPlayer(configItems.spawnX,configItems.spawnY);
        this.initUI();

    }
    
    update(){
        if(player.x > configItems.width){
            //Level end
           this.pass();
            count++;
        }
    }

    initUI(){
        this.title = this.add.text(configItems.width/2,50,"".toUpperCase(),{'fontSize':'48px','fill': '#fff','fontFamily':'retro'}).setOrigin(0.5,0.5);

        //Add play button
        this.play = this.add.text(configItems.width/2,configItems.height/2,"play".toUpperCase(),{'fontSize':'36px','fill': '#239f95','fontFamily':'retro'}).setOrigin(0.5,0.5);
        this.play.setInteractive();
        this.play.on('pointerdown', () => {
            this.startGame();
        });
    }

    startGame(){
        console.log('inside startgame');
        this.play.visible = false;
        this.title.visible = false;
        this.started = true;
        this.spawnPlayer();
    }

    spawnPlayer(){
         //Create Player
         if(player != null){
            player.destroy();
            player = null;
         }
            
         player = this.physics.add.sprite(spawnPositionX,spawnPositionY,'tile');
         player.tint = configItems.playerColor;
         player.body.setVelocityX(configItems.playerSpeed);
         this.physics.add.collider(player,groundContainer);
    }


    //Go to First Level
    pass(){
        if(this.started)
            this.scene.start('level1');
    }

}
