import BasicScene from "./BasicScene.js";
import GameConstants from "../services/GameConstants.js";
/**
 * Escena de la prehistoria
 */

class Level2 extends BasicScene {
    constructor() {
        super({key: GameConstants.Levels.LEVEL2});
        this.target = GameConstants.Levels.LEVEL2;
    }
    
    create() {
        
        //Read Tilemap
        let map = this.createMap();


        // background repeated with the map size
        this.bg = this.add.tileSprite(0, 0,map.widthInPixels,map.heightInPixels, GameConstants.Textures.BG_LEVEL2).setOrigin(0).setScale(1.25);
        

        //Tilemap
        let level2Tile = map.addTilesetImage(GameConstants.Tiles.FOREST_PACK);
        let Level2 = map.createDynamicLayer(GameConstants.Layers.WORLD, level2Tile, 0, 0);
        Level2.setCollisionByExclusion([-1]);


        //  Our animated water tile sprite
        this.water = this.add.tileSprite(0, map.heightInPixels-175, map.widthInPixels, 256, 'water').setOrigin(0);

        this.tweens.add({
            targets: this.water,
            props: {
                tilePositionY: {
                    value: 12,
                    ease: 'Sine.easeInOut',
                    duration: 2500,
                    yoyo: true,
                    repeat: -1
                },
                tilePositionX: {
                    value: 128,
                    ease: 'Linear',
                    duration: 2000,
                    repeat: -1
                }
            },
        });

        //Lo ponemos al frente
        this.water.setDepth(2);
        
        this.physics.add.existing(this.water);
        this.water.body.setAllowGravity(false);

        
        //Text Dialog
        this.textDialog = this.add.text(30, 570, GameConstants.Texts.BUSCAR_ROPA_TROGLODITA, {
            fontSize: '25px',
            fill: '#ffffff'
        });
        this.textDialog.setScrollFactor(0);
        this.textDialog.setDepth(1);


        //Text Health
        this.textHealth = this.add.text(30, 20, GameConstants.Texts.VIDAS, {
            fontSize: '25px',
            fill: '#ffffff'
        });
        this.textHealth.setScrollFactor(0);
        this.textHealth.setDepth(1);

        //Daniela Creation        
        this.daniela = this.createDaniela(this, 100, 100);

         
        
        //Colliders
        this.physics.add.collider(this.daniela, Level2);

        this.physics.add.overlap(this.daniela, this.water, () => {
            this.daniela.waterCollision();

            console.log('Daniela colisiona con agua');
        });

        
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.daniela);

    }

    update(delta) {
        this.daniela.update(delta);        
    }
}

export default Level2;
