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
        this.addEventForMusic(this.bgmusic,true,200);

                        
        const menuButton = this.add.dynamicBitmapText(80, y * 2, 'pixel', this.TG.tr('LEVELSELECT.MENU'), 24);        
        menuButton.setInteractive();

        menuButton.on('pointerdown', () => { 
            this.changeScene(this, GameConstants.Levels.MENU,0);
            
        });
        

        this.languageLabel = this.add.dynamicBitmapText(80,150, 'pixel', this.TG.tr('SETTINGLEVEL.LANGUAGE'), 24).setTint(0x808489);              

        this.currentLanguage = this.TG.getActualLang();
       
        this.flag1 = this.add.image(80, 200, GameConstants.Settings.FLAG_EN).setOrigin(0).setScale(2).setDepth(1);
        this.setFlagsSetting(this.flag1, "en");
        this.flag2 = this.add.image(130, 200, GameConstants.Settings.FLAG_ES).setOrigin(0).setScale(2).setDepth(1);
        this.setFlagsSetting(this.flag2, "es");
        this.flag3 = this.add.image(180, 200, GameConstants.Settings.FLAG_IT).setOrigin(0).setScale(2).setDepth(1);
        this.setFlagsSetting(this.flag3, "it");
        this.flag4 = this.add.image(230, 200, GameConstants.Settings.FLAG_DE).setOrigin(0).setScale(2).setDepth(1);
        this.setFlagsSetting(this.flag4, "de");


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
        
        
   //Sounds confıg saved ın the DB sound record
   this.soundLabeltxt = this.add.dynamicBitmapText(80,50, 'pixel', this.TG.tr('SETTINGLEVEL.SOUND'), 24).setTint(0x808489);                
        
   this.DB = store.get(GameConstants.DB.DBNAME);
   
   this.soundLabel = (this.DB.sound)? GameConstants.UI.VOLUMEON:GameConstants.UI.VOLUMEOFF;          

     this.musicOnOffButton = this.add.image(100,90,this.soundLabel).setScale(0.5).setTint(0x0000FF);
     this.musicOnOffButton.setInteractive();
     
     this.musicOnOffButton.on('pointerdown', () => { 
       
       this.DB.sound=!this.DB.sound;
       store.set(GameConstants.DB.DBNAME, this.DB);

       if (!this.DB.sound) this.sound.stopAll();
        
       this.soundLabel = (this.DB.sound)? GameConstants.UI.VOLUMEON:GameConstants.UI.VOLUMEOFF;
       this.musicOnOffButton.setTexture(this.soundLabel);
     });  
        

    }

    update(time, delta) {
        
    }

    setFlagsSetting(flag, language) {
        flag.setInteractive();
        flag.on('pointerdown', () => {             
            this.TG.setLang(language);                                    
            this.changeScene(this, GameConstants.Levels.MENU,0);
        });
        if (this.currentLanguage === language) {
            this.add.rectangle(flag.x - 3, flag.y - 3, flag.width + 3, flag.height + 3, 0xff0000).setOrigin(0).setScale(2).setDepth(0);
        }
    }

}

export default SettingsLevel;
