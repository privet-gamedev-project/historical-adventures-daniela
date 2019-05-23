import BasicScene from "./BasicScene.js";
import GameConstants from "../services/GameConstants.js";
import Map from "../gameObjects/Map.js";
import BackgroundMask from "../gameObjects/BackgroundMask.js";

class Level6 extends BasicScene {
    constructor() {
        super({
            key: GameConstants.Levels.LEVEL6
        });
        this.target = GameConstants.Levels.CREDITS;
    }

    create() {
        //Daniela Creation
        this.createDaniela(GameConstants.Sprites.DanielaTroglo, false);
        //Background
        this.createRepeatedBackground(GameConstants.Textures.BG_LEVEL6);
        //Finding enemies in json map
        this.findAndLoadEnemiesFromMap(GameConstants.Enemies_Layers.Level6);
        //ExtraPoints        
        this.createCoins();
        //HealthText
        this.createHealthText();
        //BSO
        this.music = this.sound.add(GameConstants.Sound.LEVEL6.BSO, {volume: 0.4});
        this.addEventForMusic(this.music,true,100);
 
        this.audioLevel6_DANIELA_OhIBurntMyself_12 = this.sound.add(this.TG.getActualLang() + "_" + GameConstants.Sound.LEVEL6.DANIELA);
        this.addEventForMusic(this.audioLevel6_DANIELA_OhIBurntMyself_12,false);
        this.audioLevel2_LOLO_LookForTheMap_14 = this.sound.add(this.TG.getActualLang() + "_" + GameConstants.Sound.LEVEL6.LOLO_TASK);
        this.addEventForMusic(this.audioLevel2_LOLO_LookForTheMap_14,false,6000);




        //Tilemap
        this.paintLayerAndCreateCollision(GameConstants.Tiles.VOLCANO);
        this.paintLayerAndCreateCollision(GameConstants.Tiles.VOLCANO, GameConstants.Layers.LANDSCAPE, false);

        //PRIVATE SCENE ELEMENTS
        this.findTransparentObjects(GameConstants.Layers.LIMITS, GameConstants.Sprites.Limit.KEY, false, true);

        //Text Dialog
        this.textDialog = this.add.dynamicBitmapText(20, this.cameras.main.height - 55, GameConstants.Fonts.PIXEL, this.TG.tr('LEVEL6.BURNTMYSELF') + "\n\n" + this.TG.tr('LEVEL6.LOOKTHEMAP') ,12 );
        this.textDialog.setScrollFactor(0);
        this.textDialog.setDepth(5);  
        
        //Objeto mapa
        let lastMap = {x: this.daniela.x, y: this.daniela.y};
        let mapGroup = this.physics.add.group();
        this.map.findObject('Maps', m => {
            if (m.type === 'Map') {
                let map = mapGroup.create(m.x, m.y);
                map.mapId = m.properties[0].value;
                this.anims.play(GameConstants.Anims.MAP, map);
                mapGroup.add(map);
            }
        });
        mapGroup.children.iterate(m => m.body.setAllowGravity(false));

        //Colision y muestra del mapa
        this.physics.add.overlap(this.daniela, mapGroup, (player, object) => {
            let mask = new BackgroundMask(this);
            mask.show();
            
            lastMap.x = object.x;
            lastMap.y = object.y;

            let mapImage = this.add.image(this.daniela.x + 150, this.daniela.y - 75, object.mapId).setDepth(1).setScale(0.35);
            mapImage.setInteractive();
            
            let closed = false;
            mapImage.on('pointerdown', () => {
                closed=true; 
                this.closeMap(mask, mapImage);                
            });
            
            object.destroy();

            this.daniela.body.setVelocity(0, 0);
            this.scene.scene.physics.pause();
            this.scene.scene.time.addEvent({
                delay: 5000,
                callback: () => {
                    if (!closed) this.closeMap(mask, mapImage);                 
                }
            });
        });

        //Lava
        let lava = this.findTransparentObjects('Lava', 'Lava', true);
        this.physics.add.overlap(this.daniela, lava, () => {
            this.cameras.main.fadeIn(1500);
            this.daniela.body.setVelocity(0, 0);
            this.daniela.x = lastMap.x;
            this.daniela.y = lastMap.y;
        });

        //End of level
        let portal = this.createEndLevelObject('timedoor');
        this.physics.world.enable(portal);
        portal[0].setScale(0.5);
        portal[0].body.setAllowGravity(false);
       
        this.physics.add.collider(this.daniela, portal, () => {
            this.daniela.nextScene();
        })

    }
    closeMap(mask, mapImage){
        mask.hide();
        mapImage.destroy();
        this.scene.scene.physics.resume();
    }

    update(time, delta) {
        this.daniela.update(time, delta);
        Object.keys(this.enemyGroups).forEach(enemy => {
            this.enemyGroups[enemy].update();
        });
    }

    showMap(mapId) {
        //  this.reg.modal.showModal("modal1");
        // this.add.image(this.daniela.x, this.daniela.y, mapId).setDepth(0).setScale(0.2, 0.2)
    }


}

export default Level6;