import GameConstants from "../services/GameConstants.js";

/**
 * Escena que será usada como interfaz para Daniela.
 */
class UI extends Phaser.Scene {
    constructor() {
        super({
            key: 'UI'
        });        
    }

    init(data) {
        this.scenename = data.scene;                
      }

    preload() {
        //console.log('Scene: UI');
    }

    create() {
        this.height = this.cameras.main.height;
        this.width = this.cameras.main.width;

        //if detects a touch screen and it is not the bonus scene
        if (this.sys.game.device.input.touch && this.scenename!=GameConstants.Levels.BONUSLEVEL) {
            this.createControls();
        }

        //Opción de MENU en niveles
        const menuButton = this.add.dynamicBitmapText(this.width - 100, 20, 'pixel', this.TG.tr('LEVELSELECT.MENU'));        
        menuButton.setInteractive();

        menuButton.on('pointerdown', () => { 
            this.registry.events.emit(GameConstants.Events.MENU);                       
        });

        const playAgainButton = this.add.image(this.width - 140, 15 , GameConstants.Sprites.PlayAgain.KEY)
                    .setScrollFactor(0).setDepth(10).setOrigin(0).setAlpha(1).setScale(0.65); 
        playAgainButton.setInteractive();
        playAgainButton.on('pointerdown', () => { 
            this.registry.events.emit(GameConstants.Events.PLAYAGAIN);
        });

           

    }

    createControls() {
        //Para que admita usar dos controles a la vez    
        this.input.addPointer(2);
        
        // Controles
        this.leftBtn = this.add.sprite(100, 0, 'controlLeft')
            .setInteractive();
        this.rightBtn = this.add.sprite(350, 0, 'controlRight')
            .setInteractive();
        this.jumpBtn = this.add.sprite(this.width + 300, -225, 'controlUp')
            .setInteractive();
        this.downBtn = this.add.sprite(this.width + 300, 0, 'controlDown')
            .setInteractive();


        // Eventos de los controles
        this.leftBtn.on('pointerdown', () => {
            this.registry.events.emit('controlLeftON');
        });
        this.leftBtn.on('pointerup', () => {
            this.registry.events.emit('controlLeftOFF');
        });

        this.rightBtn.on('pointerdown', () => {
            this.registry.events.emit('controlRightON');
        });
        this.rightBtn.on('pointerup', () => {
            this.registry.events.emit('controlRightOFF');
        });

        this.jumpBtn.on('pointerdown', () => {
            this.registry.events.emit('controlJumpON');
        });
        this.jumpBtn.on('pointerup', () => {
            this.registry.events.emit('controlJumpOFF');
        });

        this.downBtn.on('pointerdown', () => {
            this.registry.events.emit('controlDownON');
        });
        this.downBtn.on('pointerup', () => {
            this.registry.events.emit('controlDownOFF');
        });

        // Posicionando los controles
        const controlContainer = this.add.container(
            50, 
            this.height - 90);
        controlContainer.add([
            this.leftBtn,
            this.rightBtn,
            this.jumpBtn,
            this.downBtn
        ]);
        controlContainer
            .setScale(.6)
            .setAlpha(0.8)
            .setScrollFactor(0)
            .setDepth(5);
    }


}

export default UI;