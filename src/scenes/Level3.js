import Bats from '../gameObjects/Bats.js';
import Wheels from '../gameObjects/Wheels.js';
import BasicScene from "./BasicScene.js";
import GameConstants from "../services/GameConstants.js";
import ExtraPoints from '../gameObjects/ExtraPoints.js';
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

    preload() {
        this.scene.launch('UI');
    }


    create() {
        this.UIScene = this.scene.get("UI");
                
        //Read Tilemap
        let map = this.createMap();

        //FRUITS COLLECTED
        this.fruitsCollected = 10;
        this.fruitDelay = false;
        
        // background repeated with the map size
        this.bg = this.add.tileSprite(0, 0,map.widthInPixels,map.heightInPixels, GameConstants.Textures.BG_LEVEL3).setOrigin(0).setScale(1);


        //Sounds
        //this.soundLEVEL1_LOLO_findBracelet = this.sound.add(GameConstants.Sound.LEVEL1_LOLO_FINDBRACELET);
        //this.soundLEVEL1_LOLO_findBracelet.play();


        this.music = this.sound.add(GameConstants.Sound.CAVEBATS);
        this.addEventForMusic(this.music);


        this.soundLOLO_Bien_lo_hemos_conseguido = this.sound.add(this.TG.getActualLang() + "_" + GameConstants.Sound.LOLO_WE_DID_IT);
        //Text Dialog
        this.textDialog = this.add.dynamicBitmapText(30, 570, 'pixel', GameConstants.Texts.BUSCAR_ROPA_TROGLODITA.toUpperCase(), 16);                
        this.textDialog.setScrollFactor(0);
        this.textDialog.setDepth(3);


        //Text Health        
        this.textHealth = this.add.dynamicBitmapText(30, 20, 'pixel', GameConstants.Texts.VIDAS);        
        this.textHealth.setScrollFactor(0);
        this.textHealth.setDepth(3);

         //Text Fruits        
         this.textFruits = this.add.dynamicBitmapText(30, 60, 'pixel', this.TG.tr('LEVEL3.FRUITS') + " " + this.fruitsCollected);        
         this.textFruits.setScrollFactor(0);
         this.textFruits.setDepth(3);

        //TODO: se debería pasar los parámetros 'x' e 'y' de forma dinámica en base al mapa y la posición de inicio
        // algo parecido a lo que se hace con los murciélagos y las ruedas
        //Daniela Creation
        this.daniela = this.createDaniela(this, 100, 100, GameConstants.Sprites.DanielaTroglo);        
        this.lolo = this.createLoloNormal(this, this.daniela);
        this.daniela.followedBy(this.lolo);


        //Creating Bats 
        //TODO: Crear Objeto Generico CreateFlyingObjects para usar la misma lógica 
        //en los niveles que lo necesiten
        this.bats = this.createBats(GameConstants.Sprites.Soda.KEY);        
        this.batsGroup = new Bats(this.physics.world, this, [], this.bats); 
        //TODO: Pasar el Scale y el FlipX del Sprite, para evitar cambiarlo aquí
        this.batsGroup.children.iterate((bat) => {
            bat.setScale(1);            
        });
        this.anims.play(GameConstants.Anims.SODAS, this.bats);
        

        //Creating Wheels
        //TODO: Crear objeto Generico CreateFloorObjects para usar la misma lógica 
        //en los niveles que lo necesiten         
        this.wheels = this.createWheels(GameConstants.Sprites.Donut.KEY);
        this.wheelsGroup = new Wheels(this.physics.world, this, [], this.wheels,75);
        this.wheelsGroup.children.iterate((wheel) => {
            wheel.setScale(1);
        });    
        this.anims.play(GameConstants.Anims.DONUT, this.wheels);

        //MAMUT
        this.mamuts = this.createEndLevelObject(GameConstants.Sprites.Mamut.KEY);        
        this.physics.world.enable(this.mamuts);
        this.mamut = this.mamuts[0];
        this.mamut.setScale(0.55);                
        this.mamut.body.setSize(200,20);   
        this.mamut.body.setImmovable(true);
        this.mamut.body.setAllowGravity(false);
        console.log(this.mamut);
        this.anims.play(GameConstants.Anims.MAMUT.SLEEP, this.mamut);


        //Create Joystick
        /*this.joysticks = this.map.createFromObjects('ActionButton', 'openwall', GameConstants.Sprites.Joystick.KEY);
        this.physics.world.enable(this.joysticks);
        this.joystick = this.joysticks[0];
        this.joystick.setScale(1.5);
        this.joystick.body.setAllowGravity(false);
        this.anims.play(GameConstants.Anims.JOYSTICK, this.joystick);*/

        //FRUITS
        //TODO: Modify with new Classes
        //Avocado, Straberry, Cherry, Banana, Watermelon
        this.fruitsArray = ["avocado.png","banana.png","cherry.png","cherry.png","watermelon.png"];

        //this.fruit = this.add.sprite(100,200,"fruits",this.fruits[2]);
        this.fruits = this.map.createFromObjects('Fruits', 'fruit', {key: 'fruits'});
        this.fruitsGroup = this.physics.add.group();
        this.fruits.map((sprite) => {            
            
            let newsprite = this.add.sprite(sprite.x,sprite.y,"fruits",this.fruitsArray[Phaser.Math.Between(0,4)]);
            sprite.destroy();
            this.fruitsGroup.add(newsprite);
        });        
        
        this.fruitsGroup.children.iterate((fruit) => {            
            fruit.body.setAllowGravity(false);
            fruit.setDepth(3);           
        });

        this.physics.add.overlap(this.daniela, this.fruitsGroup, function(player, object){
            
            if (!this.fruitDelay) {
                    if (this.fruitsCollected>0) this.fruitsCollected--;
                    this.fruitDelay = true;                    
            
                    
                    this.textFruits.setText(this.TG.tr('LEVEL3.FRUITS') + " " + this.fruitsCollected);

                    this.tweens.add({
                        targets: object,
                        y: object.y - 100,
                        alpha: 0,
                        duration: 800,
                        ease: "Cubic.easeOut",
                        callbackScope: this,
                        onComplete: function(){
                            this.fruitsGroup.killAndHide(object);
                            this.fruitsGroup.remove(object);                
                            
                            console.log(this.fruitsCollected);
                        }
                    });

                    if (this.fruitsCollected == 0){
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




        //Tilemap
        let level2Tile = map.addTilesetImage(GameConstants.Tiles.GRASS_TILES);
        let Level2 = map.createDynamicLayer(GameConstants.Layers.WORLD, level2Tile, 0, 0);
        Level2.setCollisionByExclusion([-1]);
        let Level2Landscape = map.createDynamicLayer('Landscape', level2Tile, 0, 0);
        let Wall =  map.createDynamicLayer('Wall', level2Tile, 0, 0);
        Wall.setCollisionByExclusion([-1]);


        //ExtraPoints        
        this.extraPoints = this.createExtraPoints(GameConstants.Sprites.ExtraPoint.KEY);
        this.extraPointsGroup = new ExtraPoints(this.physics.world, this, [], this.extraPoints);                         
        this.anims.play(GameConstants.Anims.EXTRAPOINT, this.extraPoints);
        
        //EXtraPoints collisions 
        this.physics.add.overlap(this.daniela, this.extraPointsGroup, function(player, object){
            this.daniela.collectExtraPoints(this.extraPointsGroup, object);
        }, null, this);



         //Colliders
        this.colliderWall = this.physics.add.collider(this.daniela, Wall);
        this.colliderWall2 = this.physics.add.collider(this.batsGroup, Wall);
        this.colliderWall3 = this.physics.add.collider(this.wheelsGroup, Wall);
        /*
        //Open WALL LOGIC
        this.physics.add.collider(this.daniela, this.joystick, () => {
            this.joystick.destroy();   
            this.colliderWall.destroy();         
            this.colliderWall2.destroy();         
            this.colliderWall3.destroy();         
            Wall.alpha=0;   
        });*/

        
         
        this.physics.add.collider(this.daniela, Level2);
        this.physics.add.collider(this.batsGroup, Level2);
        this.physics.add.collider(this.wheelsGroup, Level2);
        this.physics.add.overlap(this.daniela, this.mamut, () => {
            if (this.fruitsCollected == 0){
                this.fruitsCollected == -1;                                       
                this.music.stop();
                this.soundLOLO_Bien_lo_hemos_conseguido.play();
                console.log('Daniela encuentra pulsera magica');
                this.daniela.nextScene();
            }
        });
        this.physics.add.overlap(this.daniela, this.bats, () => {
            this.daniela.enemyCollision();
            console.log('Daniela colisiona con murciélago');
        });
        this.physics.add.overlap(this.daniela, this.wheels, () => {
            this.daniela.enemyCollision();
            console.log('Daniela colisiona con ruedas');
        });


        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.daniela);
    }

    update(time, delta) {
        this.daniela.update(time,delta);
        this.batsGroup.update();
        this.wheelsGroup.update();
    }
}
export default Level3;