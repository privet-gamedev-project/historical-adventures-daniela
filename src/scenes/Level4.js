import BasicScene from "./BasicScene.js";
import GameConstants from "../services/GameConstants.js";
import Daniela from "../player/Daniela.js";
import Lianas from "../gameObjects/Lianas.js";
import LianasEnd from "../gameObjects/LianasEnd.js";
import Crocodiles from "../gameObjects/Crocodiles.js";
/**
 * Escena del Mamut
 */
class Level4 extends BasicScene {
    constructor() {
        super({
            key: GameConstants.Levels.LEVEL4
        });
    }
    preload() {
        this.scene.launch('UI');
    }
    create() {
        this.UIScene = this.scene.get("UI");

        //background
        this.add.tileSprite(0, 0, 15000, 600, "oceanBackground").setOrigin(0).setScale(1.30);

        //TileMap
        let map = this.createMap();
        let level4Tile = map.addTilesetImage('jungle', 'jungleTileset');
        let waterLayer = map.createDynamicLayer('water', level4Tile, 0, 0);
        let groundLayer = map.createDynamicLayer('ground', level4Tile, 0, 0);

        let decorationLayer = map.createDynamicLayer('decoration', level4Tile, 0, 0);
        groundLayer.setCollisionByExclusion([-1]);

        //CreateLianes
        this.liana = this.createLianas();
        this.groupOfLianas = new Lianas(this.physics.world, this, [], this.liana);
        //Create End of Lianas, so Daniela falls once she overlaps it.
        this.endOfLiana = this.createEndOfLianas();
        this.groupOfEndOfLianas = new LianasEnd(this.physics.world, this, [], this.endOfLiana);
        console.log(this.groupOfEndOfLianas);
        //create Crocodile
        this.crocodile = this.createCrocodile();
        this.groupOfCrocodiles = new Crocodiles(this.physics.world, this, [], this.crocodile);
        this.anims.play(GameConstants.Anims.CROCODILE, this.crocodile);

        //Text Health
        this.textHealth = this.add.dynamicBitmapText(30, 20, 'pixel', GameConstants.Texts.VIDAS);
        this.textHealth.setScrollFactor(0);
        this.textHealth.setDepth(3);
        //Create Daniela
        this.daniela = this.createDaniela(this, 100, 100, GameConstants.Sprites.DanielaTroglo);
        this.lolo = this.createLoloNormal(this, this.daniela);
        this.daniela.followedBy(this.lolo);


        //Collides
        this.physics.add.collider(this.daniela, groundLayer);
        this.physics.add.overlap(this.daniela, this.groupOfLianas, this.danielaOverLiana, null, this);
        this.physics.add.overlap(this.daniela, this.groupOfEndOfLianas, this.danielaOverEndOfLiana, null, this);
        this.physics.add.collider(this.groupOfCrocodiles, groundLayer, this.crocodileChangeDirection, null, this);
        //Game camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.daniela);
    }
    update(time, delta) {
        this.daniela.update(time,delta);


    }
    //CUSTOM
    danielaOverLiana(daniela, liana) {
        daniela.x = liana.x;
        daniela.isInLiana = true;
        this.daniela.body.velocity.x = 0;

        if (!liana.isAFalseLiana) {
            daniela.body.setAllowGravity(false);
            this.daniela.body.velocity.y = 0;
        } else {
            liana.body.setAllowGravity(true);
        }
    }
    danielaOverEndOfLiana(daniela, liana) {
        this.daniela.y += 50;
        daniela.isInLiana = false;
        daniela.body.setAllowGravity(true);
    }
    crocodileChangeDirection(crocodile) {
        if (crocodile.isGoingLeft) {
            crocodile.setScale(-1, 1);
            crocodile.body.setVelocityX(crocodile.velX);
            crocodile.isGoingLeft = false;
        } else {
            crocodile.setScale(1, 1);
            crocodile.body.setVelocityX(-crocodile.velX);
            crocodile.isGoingLeft = true;
        }
    }
}
export default Level4;
