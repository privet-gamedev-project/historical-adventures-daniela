import BasicScene from "./BasicScene.js";
import GameConstants from "../services/GameConstants.js";
import UI from "./UI.js";

class Menu extends BasicScene {
    constructor() {
        super({key: 'Menu'});
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
        
        this.settingsButton = this.add.dynamicBitmapText(width, 50, 'pixel', this.TG.tr('MENU.SETTINGS')).setTint(0x808489).setInteractive();
        this.settingsButton.setPosition(width - this.settingsButton.width - 50, 50);
        this.changeSceneFromButton(this.settingsButton, GameConstants.Levels.SETTINGSLEVEL);
      
                        
        const startButton = this.add.dynamicBitmapText(80, y * 2, 'pixel', this.TG.tr('MENU.PLAY'), 24);        
        startButton.setInteractive();
        this.changeSceneFromButton(startButton, GameConstants.Levels.LEVELSELECT);

        const introButton = this.add.dynamicBitmapText(220, y * 2, 'pixel', this.TG.tr('MENU.INTRO'), 24);                
        introButton.setInteractive();
        this.changeSceneFromButton(introButton, GameConstants.Levels.INTROSTORY);

        const scoresButton = this.add.dynamicBitmapText(400, y * 2, 'pixel', this.TG.tr('MENU.SCORES'), 24);                        
        scoresButton.setInteractive();
        this.changeSceneFromButton(scoresButton, GameConstants.Levels.SCORES);

        const creditsButton = this.add.dynamicBitmapText(600, y * 2, 'pixel', this.TG.tr('MENU.CREDITS'), 24);        
        creditsButton.setInteractive();
        this.changeSceneFromButton(creditsButton, GameConstants.Levels.CREDITS);

        // change the position of the buttons
        let buttons = [
            startButton,
            introButton,
            scoresButton,
            creditsButton
        ];

        let freeSpace = width;
        buttons.forEach(function(button) {
            freeSpace = freeSpace - button.width;
        });
        
        let distance = freeSpace / (buttons.length + 1);
        
        for(let i = 0; i < buttons.length; i++) {
            let xPositionButton = distance * (i + 1);
            for (let j = 0; j < i; j++) {
                xPositionButton = xPositionButton + buttons[j].width;
            }
            buttons[i].setPosition(xPositionButton, buttons[i].y);
        }
    }

    update(time, delta) {
        
    }

    changeSceneFromButton(pressedButon, newScene){
        pressedButon.on('pointerdown', () => {             
            this.changeScene(this, newScene, 0); 
        });
    }

}
   
export default Menu;