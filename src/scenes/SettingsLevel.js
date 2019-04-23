import BasicScene from "./BasicScene.js";
import GameConstants from "../services/GameConstants.js";
import DB from "../services/DB.js";

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

                        
        const menuButton = this.add.dynamicBitmapText(80, y * 2, 'pixel', this.TG.tr('LEVELSELECT.MENU'), 24);        
        menuButton.setInteractive();

        menuButton.on('pointerdown', () => { 
            this.changeScene(this, GameConstants.Levels.MENU,0);
            
        });
        

        this.languageLabel = this.add.dynamicBitmapText(80,150, 'pixel', this.TG.tr('SETTINGLEVEL.LANGUAGE'), 24).setTint(0x808489);              
       // let languageToChange = (this.TG.getActualLang()=='es')?'en':'es';
       // this.currentLanguage = this.add.dynamicBitmapText(80, 200, 'pixel', this.TG.getActualLang() , 24).setTint(0xff0000);
       // this.languageButton = this.add.dynamicBitmapText(150, 200, 'pixel', languageToChange , 24).setTint(0x808489);
       // this.languageButton.setInteractive();
       // this.languageButton.on('pointerdown', () => {             
       //     if (this.TG.getActualLang()=='es') this.TG.setLang('en');
       //     else this.TG.setLang('es');                                  
       //     this.changeScene(this, GameConstants.Levels.MENU,0);
       // });

        
        this.flag1 = this.add.image(80, 200, GameConstants.Settings.FLAG_EN).setOrigin(0).setScale(2);
        this.flag1.setInteractive();
        this.flag1.on('pointerdown', () => {             
            this.TG.setLang('en');                                  
            this.changeScene(this, GameConstants.Levels.MENU,0);
        });
        this.flag2 = this.add.image(130, 200, GameConstants.Settings.FLAG_ES).setOrigin(0).setScale(2);
        this.flag2.setInteractive();
        this.flag2.on('pointerdown', () => {             
            this.TG.setLang('es');                                    
            this.changeScene(this, GameConstants.Levels.MENU,0);
        });
        this.flag3 = this.add.image(180, 200, GameConstants.Settings.FLAG_IT).setOrigin(0).setScale(2);
        this.flag3.setInteractive();
        this.flag3.on('pointerdown', () => {             
            this.TG.setLang('it');                                    
            this.changeScene(this, GameConstants.Levels.MENU,0);
        });
        this.flag4 = this.add.image(230, 200, GameConstants.Settings.FLAG_DE).setOrigin(0).setScale(2);
        this.flag4.setInteractive();
        this.flag4.on('pointerdown', () => {             
            this.TG.setLang('de');                                    
            this.changeScene(this, GameConstants.Levels.MENU,0);
        });


        //Reset Scores and Levels DB Button
        this.resetDBLabel = this.add.dynamicBitmapText(80,250, 'pixel', this.TG.tr('SETTINGLEVEL.RESET'), 24).setTint(0x808489);
        this.resetDBLabel.setInteractive();
        this.resetDBLabel.on('pointerdown',() => {
            //Clear DB
            store.clearAll();  
            DB.createDB([{key: GameConstants.DB.DBNAME, value: DB.DB}]);          
            this.DoneLabel = this.add.dynamicBitmapText(80,300, 'pixel', this.TG.tr('SETTINGLEVEL.DONE'), 24).setTint(0x808489);

            store.each(function(key, value) {
                console.log(key, '->', value);               
            });
        });
        
        
        //TODO: Guardar el estado del mute para el juego completo
        // buttons
        this.soundLabeltxt = this.add.dynamicBitmapText(80,50, 'pixel', this.TG.tr('SETTINGLEVEL.SOUND'), 24).setTint(0x808489);                
        
        this.soundLabel = (this.muted)? GameConstants.UI.VOLUMEOFF:GameConstants.UI.VOLUMEON;          

          this.musicOnOffButton = this.add.image(100,90,this.soundLabel).setScale(0.5).setTint(0x0000FF);
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
