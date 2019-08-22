
'use strict';
import Main from './main.js';
import Level1 from './level1.js';
import Level2 from './level2.js';
import Level3 from './level3.js';
import Level4 from './level4.js';
import Level5 from './level5.js';
import Level6 from './level6.js';

var game;


var config = {
    type: Phaser.AUTO,
    scene : [
        Main,
        Level1,
        Level2,
        Level3,
        Level4,
        Level5,
        Level6,
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity :{ y : 2400},
            debug: true
        },

    },
   // backgroundColor : 0xf0554a,
   backgroundColor : 0xf0554a,
    scale:{
        mode : Phaser.Scale.RESIZE,
        autoCenter : Phaser.Scale.CENTER_BOTH
    },
}
game = new Phaser.Game(config);


