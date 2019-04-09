import BasicScene from "./BasicScene.js";
import Daniela from '../player/Daniela.js';
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

        
        this.settingsButton =this.add.dynamicBitmapText(width - 150, 50, 'pixel', this.TG.tr('MENU.SETTINGS'))
            .setTint(0x808489).setInteractive();        
        this.settingsButton.on('pointerdown', () => {                        
            this.changeScene(this, GameConstants.Levels.SETTINGSLEVEL,0);
        });
                        
        const startButton = this.add.dynamicBitmapText(80, y * 2, 'pixel', this.TG.tr('MENU.PLAY'), 24);        
        startButton.setInteractive();
    
        startButton.on('pointerdown', () => { 
            this.changeScene(this, GameConstants.Levels.LEVELSELECT,0);
            
        });

        const introButton = this.add.dynamicBitmapText(220, y * 2, 'pixel', this.TG.tr('MENU.INTRO'), 24);                
        introButton.setInteractive();

        introButton.on('pointerdown', () => { console.log('INTRO'); });

        const scoresButton = this.add.dynamicBitmapText(400, y * 2, 'pixel', this.TG.tr('MENU.SCORES'), 24);                        
        scoresButton.setInteractive();

        scoresButton.on('pointerdown', () => { 
            this.changeScene(this, GameConstants.Levels.SCORES,0);
         });

        const creditsButton = this.add.dynamicBitmapText(600, y * 2, 'pixel', this.TG.tr('MENU.CREDITS'), 24);        
        creditsButton.setInteractive();

        // tween hover
        let tween = this.tweens.add({
            targets: [creditsButton,scoresButton,introButton,startButton],    
            alpha: 0.2,
            ease: 'Linear',
            duration: 1000,
            repeat: Infinity,
            yoyo: true,
            paused: true
        });

        //CREDITS
        this.creditshown=false;
        const bgcredits = this.add.image(0, 0, GameConstants.Textures.BG_CREDITS).setOrigin(0);
        bgcredits.setInteractive();
        bgcredits.visible=this.creditshown;

        creditsButton.on('pointerdown', () => {             
                /*this.creditshown=true;
                bgcredits.visible=this.creditshown;
                this.physics.pause();*/
                this.changeScene(this, GameConstants.Levels.CREDITS,0);
                
        });

        creditsButton.on('pointerover', () => {             
            tween.restart();
        });

        creditsButton.on('pointerout', () => {             
            tween.stop(0);
        });

        bgcredits.on('pointerdown', () => {
            this.physics.pause();
            this.creditshown=false;
            bgcredits.visible=this.creditshown;
            this.physics.resume();
        });

    }

    update(time, delta) {
        
    }

}

export default Menu;
