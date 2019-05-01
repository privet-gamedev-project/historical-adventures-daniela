import BasicScene from "./BasicScene.js";
import GameConstants from "../services/GameConstants.js";


class Level2 extends BasicScene {
    constructor() {
        super({
            key: GameConstants.Levels.LEVEL2
        });
        this.target = GameConstants.Levels.LEVEL3;
    }

    preload() {
        this.scene.launch('UI');
    }
    
    create() {
        //Daniela Creation
        this.createDaniela();
        //Background
        this.createRepeatedBackground(GameConstants.Textures.BG_LEVEL2, defaultStatus, defaultStatus,{x:1.25,y:1.25});
        //Finding enemies in json map
        this.findAndLoadEnemiesFromMap(GameConstants.Enemies_Layers.Level2);
        //ExtraPoints        
        this.createCoins();
        //HealthText
        this.createHealthText();
        //Tilemap
        this.paintLayerAndCreateCollision(GameConstants.Tiles.FOREST_PACK);
        this.paintLayerAndCreateCollision(GameConstants.Tiles.FOREST_PACK, 'Landscape', false);

        //PRIVATE SCENE ELEMENTS
        let wall =  this.paintLayerAndCreateCollision(GameConstants.Tiles.FOREST_PACK, 'Wall');
        this.findTransparentObjects(GameConstants.Layers.LIMITS, GameConstants.Sprites.Limit.KEY, false, true);
        
        //MUSIC and AUDIOS
        this.music = this.sound.add(GameConstants.Sound.CAVEBATS);
        this.addEventForMusic(this.music,true,2000);
        this.soundLOLO_Bien_lo_hemos_conseguido = this.sound.add(this.TG.getActualLang() + "_" + GameConstants.Sound.LOLO_WE_DID_IT);
        
        //Text Dialog
        this.textDialog = this.add.dynamicBitmapText(30, 570, 'pixel', GameConstants.Texts.BUSCAR_ROPA_TROGLODITA.toUpperCase(), 16);                
        this.textDialog.setScrollFactor(0);
        this.textDialog.setDepth(3);

        //Create CaveManClothes
        this.cavemanclothes = this.createEndLevelObject(GameConstants.Sprites.Cavemen_Clothes.KEY);        
        this.physics.world.enable(this.cavemanclothes);
        this.cavemanclothe = this.cavemanclothes[0];
        this.cavemanclothe.setScale(2.75);
        this.cavemanclothe.body.setAllowGravity(false);
        this.anims.play(GameConstants.Anims.CAVEMAN_CLOTHES, this.cavemanclothe);
        
        //Create Joystick
        this.joysticks = this.map.createFromObjects('ActionButton', 'openwall', GameConstants.Sprites.Joystick.KEY);
        this.physics.world.enable(this.joysticks);
        this.joystick = this.joysticks[0];
        this.joystick.setScale(1.5);
        this.joystick.body.setAllowGravity(false);
        this.anims.play(GameConstants.Anims.JOYSTICK, this.joystick);

        //Wall collider        
        this.physics.add.collider(this.daniela, this.joystick, () => {
            this.joystick.destroy();
            wall.setCollisionByExclusion([0]);
            wall.alpha=0;
        });

        this.physics.add.collider(this.daniela, this.cavemanclothe, () => {
            this.music.stop();
            this.cavemanclothe.destroy();
            this.soundLOLO_Bien_lo_hemos_conseguido.play();
            console.log('Daniela encuentra pulsera magica');
            this.daniela.nextScene();
        });

    }

    update(time, delta) {
        this.daniela.update(time, delta);
        Object.keys(this.enemyGroups).forEach(enemy => {
            this.enemyGroups[enemy].update();
        });
    }
}
export default Level2;