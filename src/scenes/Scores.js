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
        this.bgmusic = this.sound.add(GameConstants.Sound.CAVEMAN_BG);
        this.addEventForMusic(this.bgmusic,200);


        this.DB = store.get('gamedata');

                        
        const menuButton = this.add.dynamicBitmapText(80, y * 2, 'pixel', this.TG.tr('LEVELSELECT.MENU'), 24);        
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
        const level3Label = this.add.dynamicBitmapText(80, 200, 'pixel', this.TG.tr('LEVELSELECT.LEVEL') + ' 3 : ' + this.DB.worlds.Level3.score , 24).setTint(0x808489);        
        const level4Label = this.add.dynamicBitmapText(80, 250, 'pixel', this.TG.tr('LEVELSELECT.LEVEL') + ' 4 : ' + this.DB.worlds.Level4.score , 24).setTint(0x808489);        
        

        

    }

    update(time, delta) {
        
    }

}

export default Scores;
