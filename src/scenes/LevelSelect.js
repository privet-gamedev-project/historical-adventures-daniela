import BasicScene from "./BasicScene.js";
import Daniela from '../player/Daniela.js';
import GameConstants from "../services/GameConstants.js";
import UI from "./UI.js";


class LevelSelect extends BasicScene {
    constructor() {
        super({key: 'LevelSelect'});
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
        this.bg = this.add.image(x, y, GameConstants.Textures.BG_MENU).setScale(0.25);

        //bg sound
        this.bgmusic = this.sound.add(GameConstants.Sound.CAVEMAN_BG);
        this.addEventForMusic(this.bgmusic,200);

                        
        const menuButton = this.add.dynamicBitmapText(80, y * 2, 'pixel', this.TG.tr('LEVELSELECT.MENU'), 24);        
        menuButton.setInteractive();

        menuButton.on('pointerdown', () => { 
            this.changeScene(this, GameConstants.Levels.MENU,0);
            
        });
        
        const levelsLabel = this.add.dynamicBitmapText(250, y * 2, 'pixel', this.TG.tr('LEVELSELECT.LEVELS'), 24);        
                
        const level1Button = this.add.dynamicBitmapText(450, y * 2, 'pixel', '1', 24);        
        level1Button.setInteractive();

        level1Button.on('pointerdown', () => { 
            this.changeScene(this, GameConstants.Levels.LEVEL1,0);
            
        });

        const level2Button = this.add.dynamicBitmapText(550, y * 2, 'pixel', '2', 24);        
        level2Button.setInteractive();

        level2Button.on('pointerdown', () => { 
            this.changeScene(this, GameConstants.Levels.LEVEL2,0);
            
        });

        const level3Button = this.add.dynamicBitmapText(650, y * 2, 'pixel', '3', 24);        
        level3Button.setInteractive();

        level3Button.on('pointerdown', () => { 
            this.changeScene(this, GameConstants.Levels.LEVEL3,0);
            
        });

        const level4Button = this.add.dynamicBitmapText(750, y *2, 'pixel', '4', 24);        
        level4Button.setInteractive();

        level4Button.on('pointerdown', () => { 
            this.changeScene(this, GameConstants.Levels.LEVEL4,0);
            
        });

        const level6Button = this.add.dynamicBitmapText(800, y *2, 'pixel', '6', 24);
        level6Button.setInteractive();

        level6Button.on('pointerdown', () => {
            this.changeScene(this, GameConstants.Levels.LEVEL6,0);

        });

        

    }

    update(time, delta) {
        
    }

}

export default LevelSelect;
