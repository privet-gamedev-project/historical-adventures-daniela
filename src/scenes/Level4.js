import BasicScene from "./BasicScene.js";
import GameConstants from "../services/GameConstants.js";
import Lianas from "../gameObjects/Lianas.js";
import LianasEnd from "../gameObjects/LianasEnd.js";

class Level4 extends BasicScene {
    constructor() {
        super({
            key: GameConstants.Levels.LEVEL4
        });
        this.target = GameConstants.Levels.LEVEL5;
    }

    create() {
        //Daniela Creation
        this.createDaniela(GameConstants.Sprites.DanielaTroglo, false);
        //Background
        //this.createRepeatedBackground(GameConstants.Textures.BG_LEVEL4, defaultStatus, defaultStatus, { x: 1.30, y: 1.30 });
    
        //BG PARALLAX
        this.bg_clouds = this.add.tileSprite(0, 0, this.map.widthInPixels, this.map.heightInPixels, 'bg-clouds').setOrigin(0).setScale(1.65);
        this.bg_mountains = this.add.tileSprite(0, -20, this.map.widthInPixels, this.map.heightInPixels, 'bg-mountains').setOrigin(0).setScale(1.65);
        this.bg_trees = this.add.tileSprite(0, 0, this.map.widthInPixels, this.map.heightInPixels, 'bg-trees').setOrigin(0).setScale(1.65);
    
        //Finding enemies in json map
        this.findAndLoadEnemiesFromMap(GameConstants.Enemies_Layers.Level4);
        this.findTransparentObjects(GameConstants.Layers.LIMITS, GameConstants.Sprites.Limit.KEY, false, true);
        //ExtraPoints        
        this.createCoins();
        //HealthText
        this.createHealthText();
        //CreateAudios
        this.soundLOLO_Bien_lo_hemos_conseguido = this.sound.add(this.TG.getActualLang() + "_" + GameConstants.Sound.LEVELALL.WEDIDIT);
        //bso
        this.music = this.sound.add(GameConstants.Sound.Level4.BSO, {volume: 0.4});
        this.addEventForMusic(this.music,true);
        //Text Dialog
        this.textDialog = this.add.dynamicBitmapText(30, 570, 'pixel', GameConstants.Texts.BUSCAR_ROPA_TROGLODITA.toUpperCase(), 16);
        this.textDialog.setScrollFactor(0);
        this.textDialog.setDepth(3);
        //Tilemap
        this.paintLayerAndCreateCollision(GameConstants.Tiles.JUNGLE);
        this.paintLayerAndCreateCollision(GameConstants.Tiles.JUNGLE, GameConstants.Layers.LANDSCAPE, false);


        //PRIVATE SCENE ELEMENTS
        //Grupo de rectangulos en capa  Water
        this.hitWater = false;
        let water = this.findTransparentObjects('Water', 'Water', false);
        this.physics.add.overlap(this.daniela, water, (daniela, waterLayer) => {    
            if (!this.hitWater) {
                daniela.loseHealth();
                daniela.soundDanielaAuch.play();                           
                let newX = waterLayer.x - (waterLayer.width/2) - 100;
                let newY = waterLayer.y - (waterLayer.height/2) - 200;
                this.cameras.main.fadeIn(1500);
                this.daniela.body.setVelocity(0, 0);
                this.daniela.x = newX;
                this.daniela.y = newY;
                if (this) {
                    this.time.addEvent({
                        delay: 600,
                        callback: () => {                            
                            this.hitWater = false;
                        },
                        callbackScope: this
                    });
                }
            }
        });    
            



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
        //End of level
        if (this.daniela.x > 4700&&!this.daniela.reachedTheEnd) {
            this.soundLOLO_Bien_lo_hemos_conseguido.play();
            this.daniela.nextScene();
            this.daniela.reachedTheEnd=true;//variable created to get called just once
        }

        //PARALLAX Move relative to cameras scroll move
        this.bg_mountains.tilePositionX = this.cameras.main.scrollX * 0.01 ;
        this.bg_trees.tilePositionX = this.cameras.main.scrollX * 0.03;


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
        this.daniela.y += 10;
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
