import BasicScene from "./BasicScene.js";
import GameConstants from "../services/GameConstants.js";
import Daniela from "../player/Daniela.js";
/**
 * Escena del Mamut
 */
class Level4 extends BasicScene {
    constructor() {
        super({
            key: GameConstants.Levels.LEVEL4
        });
    }

    preload(){
        this.scene.launch('UI');
    }
    create() {        
        
        //background
        this.add.tileSprite(0, 0, 15000, 600, "oceanBackground").setOrigin(0).setScale(1.30);

        //TileMap
        let map = this.createMap();
        let level4Tile = map.addTilesetImage('jungle', 'jungleTileset');
        let groundLayer = map.createDynamicLayer('ground', level4Tile, 0, 0);
        let waterLayer = map.createDynamicLayer('water', level4Tile, 0, 0);
        let decorationLayer = map.createDynamicLayer('decoration', level4Tile, 0, 0);
        groundLayer.setCollisionByExclusion([-1]);

        //CreateLianes
        this.groupOfLianes = this.physics.add.group({
            allowGravity:false
        });
        this.createLianes(600,100,3);
        this.createLianes(700,100,2);
        this.createLianes(800,100,3);
        this.createLianes(900,100,1);

        //Text Health
        this.textHealth = this.add.dynamicBitmapText(30, 20, 'pixel', GameConstants.Texts.VIDAS);
        this.textHealth.setScrollFactor(0);
        this.textHealth.setDepth(3);
        //Create Daniela
        this.daniela = this.createDaniela(this, 100, 100);
        //Collides
        this.physics.add.collider(this.daniela, groundLayer);
        this.physics.add.overlap(this.daniela, this.groupOfLianes, this.danielaOverLiane,null,this);
        //Game camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.daniela);
        
    }
    update(time, delta) {
        this.daniela.update(delta);
        
    }
    //CUSTOM
    createLianes(x,y,lianaLenght){
        let posY=y;
        for(var i=0; i<lianaLenght;i++){
            let liana=this.groupOfLianes.create(x,posY,"liane");
            posY+=80;
            liana.body.setSize(1,100);
        }
    }
    danielaOverLiane(daniela,liana) {
        daniela.isInLiana=true;
        daniela.body.setAllowGravity(false);
        this.daniela.body.velocity.x=0;
        this.daniela.body.velocity.y=0;
        daniela.x=liana.x;
    }
}

export default Level4;
