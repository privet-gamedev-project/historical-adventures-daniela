import BasicScene from "./BasicScene.js";
import GameConstants from "../services/GameConstants.js";
import Map from "../gameObjects/Map.js";

class Level6 extends BasicScene {
    constructor() {
        super({
            key: GameConstants.Levels.LEVEL6
        });
        this.target = GameConstants.Levels.CREDITS;
    }

    create() {
        //Daniela Creation
        this.createDaniela(GameConstants.Sprites.DanielaTroglo);
        //Background
        this.createRepeatedBackground(GameConstants.Textures.BG_LEVEL6);
        //Finding enemies in json map
        //this.findAndLoadEnemiesFromMap(GameConstants.Enemies_Layers.Level6);
        //ExtraPoints        
        this.createCoins();
        //HealthText
        this.createHealthText();
        //Tilemap
        this.paintLayerAndCreateCollision(GameConstants.Tiles.VOLCANO);
        this.paintLayerAndCreateCollision(GameConstants.Tiles.VOLCANO, GameConstants.Layers.LANDSCAPE, false);

        //PRIVATE SCENE ELEMENTS
        this.findTransparentObjects(GameConstants.Layers.LIMITS, GameConstants.Sprites.Limit.KEY, false, true);

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
            this.showMap(object.mapId);
            lastMap.x = object.x;
            lastMap.y = object.y;
            object.destroy();
            this.daniela.body.setVelocity(0, 0);
            this.scene.scene.physics.pause();
            this.scene.scene.time.addEvent({
                delay: 5000,
                callback: () => {
                       this.scene.scene.physics.resume();
                }
            });
        });

        let lava = this.findTransparentObjects('Lava', 'Lava', true);
        this.physics.add.overlap(this.daniela, lava, () => {
            this.cameras.main.fadeIn(1500);
            this.daniela.body.setVelocity(0, 0);
            this.daniela.x = lastMap.x;
            this.daniela.y = lastMap.y;
        });

    }

    update(time, delta) {
        this.daniela.update(time, delta);
        Object.keys(this.enemyGroups).forEach(enemy => {
            this.enemyGroups[enemy].update();
        });
    }

    showMap(mapId) {
        console.log(mapId)
        switch (mapId) {
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
        }
    }
}

export default Level6;