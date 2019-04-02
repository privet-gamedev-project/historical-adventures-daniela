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
        camera.setBounds(0, 0, camera.width , camera.height * 6);

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
         const menuButton = this.add.dynamicBitmapText(20, 20, 'pixel', this.TG.tr('LEVELSELECT.MENU'))     
            .setInteractive().setScrollFactor(0);
 
         menuButton.on('pointerdown', () => { 
             this.changeScene(this, GameConstants.Levels.MENU,0);
             
         });


         //CREDITS TEXTS LINES
         //TODO: EXTRAER DE UN FICHERO DE TODAS LAS LÍNEAS
         //Y  TAMBIEN MULTIIDIOMA ES EN
         //FALTA POR COMPLETAR
         const firstY = 150;
         this.add.dynamicBitmapText(100, 20, 'pixel', 'CRÉDITOS');  
         this.add.dynamicBitmapText(100, 100, 'pixel', 'LAS HISTÓRICAS AVENTURAS DE DANIELA');  
         
         this.add.dynamicBitmapText(100, firstY, 'pixel', 'VIDEOJUEGO INTERCENTRO INTERNIVELAR',10);  
         this.add.dynamicBitmapText(100, firstY+25, 'pixel', 'CEIP MIGUEL HERÁNDEZ ALMOGÍA, MÁLAGA',10);  
         this.add.dynamicBitmapText(100, firstY+25*2, 'pixel', 'FP IES CAMPANILLAS PTA MÁLAGA',10);  
         this.add.dynamicBitmapText(100, firstY+25*4, 'pixel', 'PROFESORADO',10);  
         this.add.dynamicBitmapText(100, firstY+25*5, 'pixel', 'CARMEN GONZALEZ ROQUE',10);  
         this.add.dynamicBitmapText(100, firstY+25*6, 'pixel', 'SERGIO BANDERAS MORENO',10);  
         this.add.dynamicBitmapText(100, firstY+25*8, 'pixel', 'ALUMNADO',10);  
         this.add.dynamicBitmapText(100, firstY+25*9, 'pixel', '4,5,6 PRIMARIA',10);  
         this.add.dynamicBitmapText(100, firstY+25*10, 'pixel', 'FP SUPERIOR Y FP MEDIO INFORMÁTICA',10);  
         this.add.dynamicBitmapText(100, firstY+25*12, 'pixel', 'COLABORADORES GAMEDEV INDIE',10);  
         this.add.dynamicBitmapText(100, firstY+25*13, 'pixel', 'GAMMA_FP FRANCISCO PEREIRO',10);  
         this.add.dynamicBitmapText(100, firstY+25*14, 'pixel', 'BARBRILUE BARBARA BRIS',10);  
         this.add.dynamicBitmapText(100, firstY+25*16, 'pixel', 'ASSETS',10);  
         this.add.dynamicBitmapText(100, firstY+25*17, 'pixel', 'OPENGAMEART',10);  
         this.add.dynamicBitmapText(100, firstY+25*18, 'pixel', 'FREEPIK',10);  

         
         
        

        

    }

    update(time, delta) {
        
    }

}

export default Credits;
