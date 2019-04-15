import BasicScene from "./BasicScene.js";
import GameConstants from "../services/GameConstants.js";
import Lianas from "../gameObjects/Lianas.js";
import LianasEnd from "../gameObjects/LianasEnd.js";

class Level4 extends BasicScene {
    constructor() {
        super({
            key: GameConstants.Levels.LEVEL4
        });
    }
   
    create() {
        //Daniela Creation
        this.createDaniela(GameConstants.Sprites.DanielaTroglo);
        //Background
        this.createRepeatedBackground(GameConstants.Textures.BG_LEVEL4,defaultStatus,defaultStatus,  {x:1.30, y:1.30});
        //Finding enemies in json map
        this.findAndLoadEnemiesFromMap(GameConstants.Enemies_Layers.Level4);
        //HealthText
        this.createHealthText();
        //Tilemap
        this.paintLayerAndCreateCollision(GameConstants.Tiles.JUNGLE);
        this.paintLayerAndCreateCollision(GameConstants.Tiles.JUNGLE, GameConstants.Layers.LANDSCAPE, false);
        

        //PRIVATE SCENE ELEMENTS
        //Grupo de rectangulos en capa  Water
        let water = this.findTransparentObjects('Water', 'Water', false);
        this.physics.add.overlap(this.daniela, water, this.daniela.waterCollision);
        
        
        
        //CreateLianes
        this.liana = this.createLianas();
        this.groupOfLianas = new Lianas(this.physics.world, this, [], this.liana);
        //Create End of Lianas, so Daniela falls once she overlaps it.
        this.endOfLiana = this.createEndOfLianas();
        this.groupOfEndOfLianas = new LianasEnd(this.physics.world, this, [], this.endOfLiana);
        console.log(this.groupOfEndOfLianas);
        
        this.physics.add.overlap(this.daniela, this.groupOfLianas, this.danielaOverLiana, null, this);
        this.physics.add.overlap(this.daniela, this.groupOfEndOfLianas, this.danielaOverEndOfLiana, null, this);
 
    }
    update(time, delta) {
        this.daniela.update(time, delta);
        Object.keys(this.enemyGroups).forEach(enemy => {
            this.enemyGroups[enemy].update();
        });

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
    //TODO: si sigue la misma lógica que FlyingEnemy, se podria quitar, sino deberia crearse la propia clase Crocodile con su update() personalizado (por ejemplo para perseguir a daniela...)
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
