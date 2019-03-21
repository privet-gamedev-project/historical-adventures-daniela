import GameConstants from "../services/GameConstants.js";

/**
 * Escena que será usada como interfaz para Daniela.
 */
class UI extends Phaser.Scene {
    constructor() {
        super({key: 'UI'});

        this.muted=false;
    }
    
    preload() {
        console.log('Scene: UI');
    }

    create() {
          //TODO: Guardar el estado del mute para el juego completo
          // buttons
          
          this.soundLabel = (this.muted)? GameConstants.UI.VOLUMEOFF:GameConstants.UI.VOLUMEON;

          this.musicOnOffButton = this.add.image(50,50,this.soundLabel).setScale(0.5);
          this.musicOnOffButton.setInteractive();
          
          if (this.muted) this.sound.pauseAll();
  
          this.musicOnOffButton.on('pointerdown', () => { 
            //this.sound.mute();
            console.log("MUSIC");
            if (!this.muted) this.sound.pauseAll();
            else this.sound.resumeAll();
                

            this.muted=! this.muted;
            this.soundLabel = (this.muted)? GameConstants.UI.VOLUMEOFF:GameConstants.UI.VOLUMEON;
            this.musicOnOffButton.setTexture(this.soundLabel);
              
          });
    }

    update() {

    }
}

export default UI;
