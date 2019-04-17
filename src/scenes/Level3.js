import BasicScene from "./BasicScene.js";
import GameConstants from "../services/GameConstants.js";
import Invisible from "../gameObjects/Invisible.js";

/**
 * Level 3 . To open the next door with the Mamut
 * you need to collect 10 fruits
 */
class Level3 extends BasicScene {
    constructor() {
        super({
            key: GameConstants.Levels.LEVEL3
        });
        this.target = GameConstants.Levels.LEVEL4;
    }

    create() {
      
        //Daniela Creation
        this.createDaniela(GameConstants.Sprites.DanielaTroglo);
        //Background
        this.createRepeatedBackground(GameConstants.Textures.BG_LEVEL3, defaultStatus, defaultStatus, {x: 1, y: 1});
        //Finding enemies in json map
        this.findAndLoadEnemiesFromMap(GameConstants.Enemies_Layers.Level3);
        //ExtraPoints        
        this.createCoins();
        //HealthText
        this.createHealthText();
        //Tilemap
        this.paintLayerAndCreateCollision(GameConstants.Tiles.GRASS_TILES);
        this.paintLayerAndCreateCollision(GameConstants.Tiles.GRASS_TILES, GameConstants.Layers.LANDSCAPE, false);

        //PRIVATE SCENE ELEMENTS
        this.findTransparentObjects(GameConstants.Layers.SPIKES,GameConstants.Sprites.Spike.KEY, true);
        
        //FRUITS COLLECTED
        this.fruitsCollected = 10;
        this.fruitDelay = false;

        this.music = this.sound.add(GameConstants.Sound.CAVEBATS);
        this.addEventForMusic(this.music);


        this.soundLOLO_Bien_lo_hemos_conseguido = this.sound.add(this.TG.getActualLang() + "_" + GameConstants.Sound.LOLO_WE_DID_IT);
        //Text Dialog
        this.textDialog = this.add.dynamicBitmapText(30, 570, 'pixel', GameConstants.Texts.BUSCAR_ROPA_TROGLODITA.toUpperCase(), 16);
        this.textDialog.setScrollFactor(0);
        this.textDialog.setDepth(3);

        //Text Fruits        
        this.textFruits = this.add.dynamicBitmapText(30, 60, 'pixel', this.TG.tr('LEVEL3.FRUITS') + " " + this.fruitsCollected);
        this.textFruits.setScrollFactor(0);
        this.textFruits.setDepth(3);

        //MAMUT
        this.mamuts = this.createEndLevelObject(GameConstants.Sprites.Mamut.KEY);
        this.physics.world.enable(this.mamuts);
        this.mamut = this.mamuts[0];
        this.mamut.setScale(0.55);
        this.mamut.body.setSize(200, 20);
        this.mamut.body.setImmovable(true);
        this.mamut.body.setAllowGravity(false);
      //  console.log(this.mamut);
        this.anims.play(GameConstants.Anims.MAMUT.SLEEP, this.mamut);

        //FRUITS
        //TODO: Modify with new Classes
        //Avocado, Straberry, Cherry, Banana, Watermelon
        this.fruitsArray = ["avocado.png", "banana.png", "cherry.png", "cherry.png", "watermelon.png"];

        //this.fruit = this.add.sprite(100,200,"fruits",this.fruits[2]);
        this.fruits = this.map.createFromObjects('Fruits', 'fruit', {key: 'fruits'});
        this.fruitsGroup = this.physics.add.group();
        this.fruits.map((sprite) => {
            let newsprite = this.add.sprite(sprite.x, sprite.y, "fruits", this.fruitsArray[Phaser.Math.Between(0, 4)]);
            sprite.destroy();
            this.fruitsGroup.add(newsprite);
        });

        this.fruitsGroup.children.iterate((fruit) => {
            fruit.body.setAllowGravity(false);
            fruit.setDepth(3);
        });

        this.physics.add.overlap(this.daniela, this.fruitsGroup, function (player, object) {

            if (!this.fruitDelay) {
                if (this.fruitsCollected > 0) this.fruitsCollected--;
                this.fruitDelay = true;

                this.textFruits.setText(this.TG.tr('LEVEL3.FRUITS') + " " + this.fruitsCollected);

                this.tweens.add({
                    targets: object,
                    y: object.y - 100,
                    alpha: 0,
                    duration: 800,
                    ease: "Cubic.easeOut",
                    callbackScope: this,
                    onComplete: function () {
                        this.fruitsGroup.killAndHide(object);
                        this.fruitsGroup.remove(object);

                        console.log(this.fruitsCollected);
                    }
                });

                if (this.fruitsCollected === 0) {
                    this.anims.play(GameConstants.Anims.MAMUT.HAPPY, this.mamut);
                }

                this.time.addEvent({
                    delay: 600,
                    callback: () => {
                        this.fruitDelay = false;
                    },
                    callbackScope: this
                });
            }

        }, null, this);


        this.physics.add.overlap(this.daniela, this.mamut, () => {
            if (this.fruitsCollected === 0) {
                this.fruitsCollected = -1;
                this.music.stop();
                this.soundLOLO_Bien_lo_hemos_conseguido.play();
                console.log('Daniela encuentra pulsera magica');
                this.daniela.nextScene();
            }
        });

    }

    update(time, delta) {
        this.daniela.update(time, delta);
        Object.keys(this.enemyGroups).forEach(enemy => {
            this.enemyGroups[enemy].update();
        });
    }

    col(){
        console.log("colision")
    }
    checkOverlap(daniela, layer) {

       

        return Phaser.Rectangle.intersects(boundsA, boundsB);

    }
}

export default Level3;