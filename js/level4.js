

var player,obstacle,groundContainer;
var spawnPositionX,spawnPositionY;
var count = 0;

var configItems = {
    backgroundColor : 0xf76262,
    groundColor : 0x216583,
    obstacleColor : 0x216583,
    playerColor : 0xfff1c1,
    noOfGround : 3,
    height : window.innerHeight,
    width : window.innerWidth,
    spawnX : 0,
    spawnY : window.innerHeight * .30 - 10,
    playerSpeed : 400,
};

export default class Level4 extends Phaser.Scene{

    constructor(){
        super('level4');
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
         this.add.text(configItems.width/2,15,"Level 4",{'fontSize':'24px','fill': '#fff'}).setOrigin(.5,.5);
         this.storyText = this.add.text(configItems.width/2,configItems.height * .15,"Once there was a boy",{'fontSize':'24px','fill': '#fff','fontFamily': 'retro'}).setOrigin(.5,.5);
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
            let ground =  this.physics.add.staticImage(0,configItems.height * .3 * i,'tile');
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


        let g1 = this.physics.add.staticImage(configItems.width* 2/4,window.innerHeight * .3,'tile')
        .setOrigin(0.5,1)
        .setScale(1,2).refreshBody();
        g1.depth = -10;
        

        let g2 = this.physics.add.staticImage(configItems.width * 3/4,window.innerHeight * .3,'tile')
        .setOrigin(0.5,1)
        .setScale(4,1).refreshBody();
        g2.depth = -10;

        let g3 = this.physics.add.staticImage(configItems.width/2,window.innerHeight * .6,'tile')
        .setOrigin(0.5,1)
        .setScale(2.5,0.5).refreshBody();

        let g31 = this.physics.add.staticImage(configItems.width * 2 /3,window.innerHeight * .6 - 25,'tile')
        .setOrigin(0.5,1)
        .setScale(2.5,2.5).refreshBody();

        let g32 = this.physics.add.staticImage(configItems.width /4,window.innerHeight * .6,'tile')
        .setOrigin(0.5,1)
        .setScale(1,2).refreshBody();

        let g4 = this.physics.add.staticImage(configItems.width * 2/5,window.innerHeight * .9,'tile')
        .setOrigin(0.5,1)
        .setScale(1,1.5).refreshBody();


        let g5 = this.physics.add.staticImage(configItems.width * 3/5,window.innerHeight * .9,'tile')
        .setOrigin(0.5,1)
        .setScale(1,1.5).refreshBody();

        let g6 = this.physics.add.staticImage(configItems.width * 4/5,window.innerHeight * .9,'tile')
        .setOrigin(0.5,1)
        .setScale(1,1.5).refreshBody();

        g1.tint = g2.tint = g3.tint = g4.tint = g5.tint = g31.tint = g32.tint = g6.tint = configItems.obstacleColor;

        obstacle.add(g1);
        obstacle.add(g2);
        obstacle.add(g3);
        obstacle.add(g4);
        obstacle.add(g5);
        obstacle.add(g31);
        obstacle.add(g32);
        obstacle.add(g6);
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
                player.body.setVelocityY(-550);
        },this);
    }

    collisions(){
        this.physics.add.overlap(player,obstacle,this.fail,null,this);
        this.physics.add.collider(player,groundContainer);
    }

    checkSpawnPosition(){
        if(player.x > configItems.width && count == 0){
            spawnPositionX = configItems.width + 100;
            spawnPositionY = configItems.height * .6 - 12.5;
            
            configItems.playerSpeed = -configItems.playerSpeed;
            player = null;
            this.spawnPlayer();
            console.log('outside');


            //Once there was a boy
            this.showText("who liked to jump",configItems.width/2,spawnPositionY - 50);

            count++;
        }
        else if(player.x < 0 && count == 1){
            spawnPositionX = 0;
            spawnPositionY = configItems.height * .9 - 12.5;
            
            configItems.playerSpeed = -configItems.playerSpeed;
            player = null;
            this.spawnPlayer();
            console.log('outside');


            //Once there was a boy
            this.showText("who liked to jump",configItems.width/2,spawnPositionY - 50);

            count++;
        }
        else if(player.x > configItems.width && count == 2){
            this.scene.start('level5');
        }
    }

    showText(txt,x,y){
        this.storyText.text = txt;
        this.storyText.x = x;
        this.storyText.y = y;
    }

}
