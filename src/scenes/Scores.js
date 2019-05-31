import BasicScene from "./BasicScene.js";
import Daniela from '../player/Daniela.js';
import GameConstants from "../services/GameConstants.js";
import UI from "./UI.js";


class Scores extends BasicScene {
    constructor() {
        super({key: 'Scores'});
    }
    
    preload(){
        
    }

    create() {

        // background positions   
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        let x = width / 2 ;
        let y = height / 2 -50;
        
        // background        
        this.bg1 = this.add.image(0, 0, GameConstants.Textures.BG_LEVEL2).setOrigin(0).setScale(1);        
        //this.bg = this.add.image(x, y, GameConstants.Textures.BG_MENU).setScale(0.25);

        //bg sound        
        /*this.bgmusic = this.sound.add(GameConstants.Sound.BONUSLEVEL.BSO);
        this.addEventForMusic(this.bgmusic,true,200);*/


        this.DB = store.get(GameConstants.DB.DBNAME);

                        
        const menuButton = this.add.dynamicBitmapText(80, y * 2 + 20, 'pixel', this.TG.tr('LEVELSELECT.MENU'), 24);        
        menuButton.setInteractive();

        menuButton.on('pointerdown', () => { 
            this.changeScene(this, GameConstants.Levels.MENU,0);
            
        });
        
        const levelsLabel = this.add.dynamicBitmapText(80, 50, 'pixel', this.TG.tr('MENU.SCORES'), 24).setTint(0x808489);        

        
                
        const levelLabel = this.add.dynamicBitmapText(80, 100, 'pixel', this.TG.tr('LEVELSELECT.LEVEL') + ' 1 : ' + this.DB.worlds.Level1.score , 24).setTint(0x808489);        
        
        for(let i=0;i<this.DB.worlds.Level1.stars;i++) {
            this.add.image(480 + (i*50), 95 , GameConstants.Sprites.Star.KEY)
            .setScrollFactor(0).setDepth(10).setOrigin(0).setScale(0.25).setAlpha(1); 
        }

        const level2Label = this.add.dynamicBitmapText(80, 150, 'pixel', this.TG.tr('LEVELSELECT.LEVEL') + ' 2 : ' + this.DB.worlds.Level2.score , 24).setTint(0x808489);        

        for(let i=0;i<this.DB.worlds.Level2.stars;i++) {
            this.add.image(480 + (i*50), 145 , GameConstants.Sprites.Star.KEY)
            .setScrollFactor(0).setDepth(10).setOrigin(0).setScale(0.25).setAlpha(1); 
        }
        const level3Label = this.add.dynamicBitmapText(80, 200, 'pixel', this.TG.tr('LEVELSELECT.LEVEL') + ' 3 : ' + this.DB.worlds.Level3.score , 24).setTint(0x808489);        
        
        for(let i=0;i<this.DB.worlds.Level3.stars;i++) {
            this.add.image(480 + (i*50), 195 , GameConstants.Sprites.Star.KEY)
            .setScrollFactor(0).setDepth(10).setOrigin(0).setScale(0.25).setAlpha(1); 
        }

        const level4Label = this.add.dynamicBitmapText(80, 250, 'pixel', this.TG.tr('LEVELSELECT.LEVEL') + ' 4 : ' + this.DB.worlds.Level4.score , 24).setTint(0x808489);        
        
        for(let i=0;i<this.DB.worlds.Level4.stars;i++) {
            this.add.image(480 + (i*50), 245 , GameConstants.Sprites.Star.KEY)
            .setScrollFactor(0).setDepth(10).setOrigin(0).setScale(0.25).setAlpha(1); 
        }


        const level5Label = this.add.dynamicBitmapText(80, 300, 'pixel', this.TG.tr('LEVELSELECT.LEVEL') + ' 5 : ' + this.DB.worlds.Level5.score , 24).setTint(0x808489);        
        
        for(let i=0;i<this.DB.worlds.Level5.stars;i++) {
            this.add.image(480 + (i*50), 295 , GameConstants.Sprites.Star.KEY)
            .setScrollFactor(0).setDepth(10).setOrigin(0).setScale(0.25).setAlpha(1); 
        }

        
        const level6Label = this.add.dynamicBitmapText(80, 350, 'pixel', this.TG.tr('LEVELSELECT.LEVEL') + ' 6 : ' + this.DB.worlds.Level6.score , 24).setTint(0x808489);        
        
        for(let i=0;i<this.DB.worlds.Level6.stars;i++) {
            this.add.image(480 + (i*50), 345 , GameConstants.Sprites.Star.KEY)
            .setScrollFactor(0).setDepth(10).setOrigin(0).setScale(0.25).setAlpha(1); 
        }


        

    }

    update(time, delta) {
        
    }

}

export default Scores;
