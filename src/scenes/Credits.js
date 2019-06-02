import BasicScene from "./BasicScene.js";
import Daniela from '../player/Daniela.js';
import GameConstants from "../services/GameConstants.js";
import UI from "./UI.js";


class Credits extends BasicScene {
    constructor() {
        super({key: 'Credits'});
    }
    
    preload(){
        
    }

    create() {

       

        // background positions   
        const camera = this.cameras.main;        
        
        //  Set the bounds on the camera:
        camera.setBounds(0, 0, camera.width , camera.height * 4.70);

        const bounds = camera.getBounds();

        //  Here we create the scroll bars. One horizontal and one vertical:
        //const h = new Scrollbar(this, { x: 4, y: 566, width: 768, height: 30, orientation: 'horizontal', barThickness: 24, padding: 4, radius: 12, trackAlpha: 0.7 });
        const v = new Scrollbar(this, { x: camera.width -40, y: 4, width: 30, height: camera.height-20, orientation: 'vertical', barThickness: 24, padding: 4, radius: 12, trackAlpha: 0.7 });

        v.on('move', function (position) {

            //  The camera height is 600px, which means the midPoint is 300.
            //  So we adjust the y value based on the position along the scrollbar, minus the camera height.
            //  This keeps the scroll bar aligned properly with the full camera range.

            const y = camera.height / 2 + ((bounds.height - camera.height) * position);

            camera.centerOnY(y);

        }, this);

        
         //Menu                
         const menuButton = this.add.dynamicBitmapText(camera.width-150, 20, 'pixel', this.TG.tr('LEVELSELECT.MENU'))     
            .setInteractive().setScrollFactor(0).setDepth(3).setTint(0x000000);
 
         menuButton.on('pointerdown', () => { 
             this.changeScene(this, GameConstants.Levels.MENU,0);
             
         });

         
         const bgCredits= GameConstants.Textures.BG_CREDITS;
         
         this.bg1 = this.add.image(0, 0, bgCredits).setOrigin(0).setScale(1);    
         this.bg2 = this.add.image(0, this.bg1.height, GameConstants.Textures.BG_CREDITS_PAGE2).setOrigin(0).setScale(1);    
         

         
         
        

        

    }

    update(time, delta) {
        
    }

}

export default Credits;
