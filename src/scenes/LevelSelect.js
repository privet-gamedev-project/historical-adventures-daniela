import BasicScene from "./BasicScene.js";
import Daniela from '../player/Daniela.js';
import GameConstants from "../services/GameConstants.js";
import UI from "./UI.js";


class LevelSelect extends BasicScene {
    constructor() {
        super({key: 'LevelSelect'});
    }
    
    preload(){
        this.scene.launch('UI');
    }

    create() {
        // background positions   
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        let x = width / 2 ;
        let y = height / 2 -50;
        
        // background        
        this.bg1 = this.add.image(0, 0, GameConstants.Textures.BG_LEVEL2).setOrigin(0).setScale(1);        
        this.bg = this.add.image(x, y, GameConstants.Textures.BG_MENU).setScale(0.35);

        //bg sound
        this.bgmusic = this.sound.add(GameConstants.Sound.CAVEMAN_BG);
        this.addEventForMusic(this.bgmusic,200);

                        
        const menuButton = this.add.dynamicBitmapText(80, 520, 'pixel', 'MENU', 24);        
        menuButton.setInteractive();

        menuButton.on('pointerdown', () => { 
            this.changeScene(this, GameConstants.Levels.MENU,0);
            
        });
        
        
        const level1Button = this.add.dynamicBitmapText(250, 520, 'pixel', 'LEVEL 1', 24);        
        level1Button.setInteractive();

        level1Button.on('pointerdown', () => { 
            this.changeScene(this, GameConstants.Levels.LEVEL1,0);
            
        });

        const level2Button = this.add.dynamicBitmapText(475, 520, 'pixel', 'LEVEL 2', 24);        
        level2Button.setInteractive();

        level2Button.on('pointerdown', () => { 
            this.changeScene(this, GameConstants.Levels.LEVEL2,0);
            
        });

        

    }

    update(time, delta) {
        
    }

}

export default LevelSelect;
