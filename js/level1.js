

var player,obstacle,groundContainer;
var spawnPositionX,spawnPositionY;
var count = 0;

var configItems = {
    backgroundColor : 0x252525,
    groundColor : 0x64c4ed,
    obstacleColor : 0x64c4ed,
    playerColor : 0xaf0404,
    noOfGround : 2,
    height : window.innerHeight,
    width : window.innerWidth,
    spawnX : 0,
    spawnY : window.innerHeight * .35 - 12.5,
    playerSpeed : 400,
};

export default class Level1 extends Phaser.Scene{

   

    constructor(){
        super('level1');
    }

    preload(){
        this.cameras.main.setBackgroundColor(configItems.backgroundColor);
        this.load.image('tile','assets/tile.jpg');
        this.scale.lockOrientation('landscape');
    }

    create(){
        spawnPositionX = configItems.spawnX;
        spawnPositionY = configItems.spawnY;
        this.createGround();
        this.createBlocks();
        this.spawnPlayer(configItems.spawnX,configItems.spawnY);
        this.jump();
        this.initUI();
    }

    update(){
       this.checkSpawnPosition();
    }

    initUI(){
         this.add.text(configItems.width/2,15,"Level 1",{'fontSize':'24px','fill': '#fff'}).setOrigin(.5,.5);
         this.storyText = this.add.text(configItems.width/2,configItems.height * .25,"Once there was a boy",{'fontSize':'24px','fill': '#fff','fontFamily': 'retro'}).setOrigin(.5,.5);
        //this.add.text(configItems.width/2,configItems.height/2,"",{'fontSize':'24px','fill': '#fff'});
        //Level no 
      //  this.add.text(100,25,"1/15",{'fontSize':'20px','fill': '#fff'});
        //Number of deaths

      //  this.add.text(25,25,"135",{'fontSize':'20px','fill': '#fff'});
    }

    createGround(){
        //Adding Ground
        groundContainer = this.physics.add.staticGroup();
        for(let i = 1 ; i <= configItems.noOfGround ; i++){
            let ground =  this.physics.add.staticImage(0,configItems.height * .35 * i,'tile');
            ground.setOrigin(0,0);
            ground.displayWidth = configItems.width + 200;
            ground.displayHeight = 25;
            ground.tint = configItems.groundColor;
            ground.refreshBody();
            groundContainer.add(ground);
        }
    }

    createBlocks(){
        //Create Obstacle blocks
        obstacle = this.physics.add.staticGroup();
        let g1 = this.physics.add.staticImage(500,window.innerHeight * .7,'tile')
        .setOrigin(0.5,0.5)
        .setScale(1,3);
        g1.depth = -10;
        obstacle.add(g1);
    }

    //Restart the level
    fail(){
        let cam = this.cameras.main;
        cam.shake(100);
       

        var global = this;

        this.time.addEvent({
            delay: 50,                // ms
            callback: function(){
                player.disableBody();
                global.spawnPlayer(spawnPositionX,spawnPositionY);
            },
            args: [],
            loop: false,
            repeat: 0,
            startAt: 0,
            timeScale: 1,
            paused: false
        });

    }

    spawnPlayer(){
         //Create Player
         if(player != null){
             console.log('player is not null');
             player.visible = false;
            player.destroy();
            player = null;
         }
         else{
             console.log('player is null');
         }

         player = this.physics.add.sprite(spawnPositionX,spawnPositionY,'tile');
         player.tint = configItems.playerColor;
         //player.body.setCollideWorldBounds(true);
         player.body.setVelocityX(configItems.playerSpeed);
         this.collisions();
    }

    jump(){
        //Input
        this.input.on('pointerdown',function(pointer){
            if(player.body.touching.down)
                player.body.setVelocityY(-650);
        },this);
    }

    collisions(){
        this.physics.add.overlap(player,obstacle,this.fail,null,this);
        this.physics.add.collider(player,groundContainer);
    }

    checkSpawnPosition(){
        if(player.x > configItems.width && count == 0){
            spawnPositionX = configItems.width + 100;
            spawnPositionY = configItems.height * .7 - 12.5;
            
            configItems.playerSpeed = -configItems.playerSpeed;
            player = null;
            this.spawnPlayer();
            console.log('outside');


            //Once there was a boy
            this.showText("who liked to jump",configItems.width/2,spawnPositionY - 50);

            count++;
        }
        else if(player.x < 0 && count == 1){
            //Level end
            this.scene.start('level2');
            count++;
        }
    }

    showText(txt,x,y){
        this.storyText.text = txt;
        this.storyText.x = x;
        this.storyText.y = y;
    }

}
