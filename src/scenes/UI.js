import GameConstants from "../services/GameConstants.js";

/**
 * Escena que será usada como interfaz para Daniela.
 */
class UI extends Phaser.Scene {
    constructor() {
        super({key: 'UI'});

        
    }
    
    preload() {
        //console.log('Scene: UI');
    }

    create() {

        this.height = this.cameras.main.height;
        this.width = this.cameras.main.width;                  
    
          
          //Si es una pantalla tactil creamos controles
          if (this.sys.game.device.input.touch){                          
            this.createControls();            
          }

    }

    update() {

    }    

    createControls(){                
        this.leftBtn = this.add.sprite(20, this.height - 200, 'controlLeft')
        .setOrigin(0).setScrollFactor(0).setInteractive().setAlpha(0.8).setDepth(5);
        this.rightBtn = this.add.sprite(220, this.height - 200, 'controlRight')
        .setOrigin(0).setScrollFactor(0).setInteractive().setAlpha(0.8).setDepth(5);
        this.jumpBtn = this.add.sprite(600, this.height - 200, 'controlUp')
        .setOrigin(0).setScrollFactor(0).setInteractive().setAlpha(0.8).setDepth(5);
    }
    
    
}

export default UI;
