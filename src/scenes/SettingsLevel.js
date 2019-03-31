import BasicScene from "./BasicScene.js";
import GameConstants from "../services/GameConstants.js";


class SettingsLevel extends BasicScene {
    constructor() {
        super({key: 'SettingsLevel'});
    }
    
    preload(){
        this.muted=false;
    }

    create() {

        // background positions   
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        let x = width / 2 ;
        let y = height / 2 -50;
        
        // background        
        this.bg1 = this.add.image(0, 0, GameConstants.Textures.BG_LEVEL2).setOrigin(0).setScale(1);        
    
        //bg sound
        this.bgmusic = this.sound.add(GameConstants.Sound.CAVEMAN_BG);
        this.addEventForMusic(this.bgmusic,200);

                        
        const menuButton = this.add.dynamicBitmapText(80, y * 2, 'pixel', 'MENU', 24);        
        menuButton.setInteractive();

        menuButton.on('pointerdown', () => { 
            this.changeScene(this, GameConstants.Levels.MENU,0);
            
        });
        
        
        
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

    update(time, delta) {
        
    }

}

export default SettingsLevel;
