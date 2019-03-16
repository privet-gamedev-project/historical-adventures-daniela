import BasicScene from "./BasicScene.js";
import Daniela from '../player/Daniela.js';
import GameConstants from "../services/GameConstants.js";


class Menu extends BasicScene {
    constructor() {
        super({key: 'Menu'});
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


        const startButton = this.add.text(80, 520, 'PLAY', { fill: '#000000', fontSize: '40px' });
        startButton.setInteractive();

        startButton.on('pointerdown', () => { 
            this.changeScene(this, GameConstants.Levels.LEVEL1,0);
            
        });

        const introButton = this.add.text(220, 520, 'INTRO', { fill: '#000000', fontSize: '40px' });
        introButton.setInteractive();

        introButton.on('pointerdown', () => { console.log('INTRO'); });

        const scoresButton = this.add.text(400, 520, 'SCORES', { fill: '#000000', fontSize: '40px' });
        scoresButton.setInteractive();

        scoresButton.on('pointerdown', () => { console.log('SCORES'); });

        const creditsButton = this.add.text(600, 520, 'CREDITS', { fill: '#000000', fontSize: '40px' });
        creditsButton.setInteractive();

        creditsButton.on('pointerdown', () => { console.log('CREDITS'); });

    }

    update(time, delta) {
        
    }

}

export default Menu;
