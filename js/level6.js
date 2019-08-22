

var player,obstacle,groundContainer;
var spawnPositionX,spawnPositionY;
var count = 0;

var configItems = {
    backgroundColor : 0x313131,
    groundColor : 0xffffff,
    obstacleColor : 0xffffff,
    playerColor : 0xca3e47,
    noOfGround : 3,
    height : window.innerHeight,
    width : window.innerWidth,
    spawnX : 0,
    spawnY : window.innerHeight * .30 - 10,
    playerSpeed : 400,
};

export default class Level6 extends Phaser.Scene{

    constructor(){
        super('level6');
    }

    preload(){
        this.cameras.main.setBackgroundColor(configItems.backgroundColor);
        this.load.image('tile','assets/tile.jpg');
        this.scale.lockOrientation('landscape');
    }

    create(){
        spawnPositionX = configItems.spawnX;
        spawnPositionY = configItems.spawnY;

        this.add.graphics({
            x : 0,
            y : 0,
            fillStyle : {
                color: 0xf1d4d4
            },
        }).fillRect(0,0,configItems.width,configItems.height/3);
        
        this.add.graphics({
            x : 0,
            y : configItems.height/3,
            fillStyle : {
                color: 0xddb6c6
            },
        }).fillRect(0,0,configItems.width,configItems.height/3);

        this.add.graphics({
            x : 0,
            y : configItems.height * 2/3,
            fillStyle : {
                color: 0xac8daf
            },
        }).fillRect(0,0,configItems.width,configItems.height/3);
        

        this.createGround();
        this.spawnPlayer(configItems.spawnX,configItems.spawnY);
        this.initUI();
    }

    initUI(){
         this.add.text(configItems.width/2,100,"The End",{'fontSize':'24px','fill': '#484c7f','fontFamily' : 'retro'}).setOrigin(.5,.5);
         //this.storyText = this.add.text(configItems.width/2,configItems.height * .15,"Once there was a boy",{'fontSize':'24px','fill': '#fff','fontFamily': 'retro'}).setOrigin(.5,.5);
         this.add.text(configItems.width/2,configItems.height - 25,"Developed as a part of #100DaysOfCode",{'fontSize':'12px','fill': '#484c7f','fontFamily' : 'retro'}).setOrigin(.5,.5);
    }   

    createGround(){
        //Adding Ground
        groundContainer = this.physics.add.staticGroup();
        let ground =  this.physics.add.staticImage(0,configItems.height * .5 ,'tile');
        ground.setOrigin(0,0);
        ground.displayWidth = configItems.width + 200;
        ground.displayHeight = 25;
        ground.tint = 0x484c7f;
        ground.refreshBody();
        groundContainer.add(ground);
    }

    spawnPlayer(){
         //Create Player
         player = this.physics.add.sprite(spawnPositionX,spawnPositionY,'tile');
         player.tint = configItems.playerColor;
         //player.body.setCollideWorldBounds(true);
         player.body.setVelocityX(configItems.playerSpeed);
         this.physics.add.collider(player,groundContainer);
    }
}
